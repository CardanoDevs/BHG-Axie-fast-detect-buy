const winston = require('winston');
const { format } = winston;
require('winston-daily-rotate-file');

const initializeLogger = function initializeLoggerFunction(directory,machineID) {
  var transport = new (winston.transports.DailyRotateFile)({
    filename: "logs/"+directory+"/"+machineID+".%DATE%.log",
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxFiles: '7d'
  });
  const newFile = "logs/"+directory+"/"+machineID+".log";
  winston.loggers.add(machineID, {
    format: format.combine(
      format.errors({ stack: true }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS'
      }),
      format.printf(info => `${info.timestamp} ${machineID} ${info.level}: ${info.message}`)
    ),
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: format.combine(
          format.errors({ stack: true }),
          format.colorize(),
          format.printf(
            info => `${info.timestamp} ${machineID} ${info.level}: ${info.message}`
          )
        )
      }),
      transport
    ],
    exceptionHandlers: [
      transport
    ]
  });
};
module.exports = initializeLogger;