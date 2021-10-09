

const Web3 = require('web3');

const url = "wss://api.roninchain.com/ws";

const options = {
    timeout: 30000,
    clientConfig: {
        maxReceivedFrameSize:   100000000,
        maxReceivedMessageSize: 100000000,
    },
    reconnect: {
        auto: true,
        delay: 5000,
        maxAttempts: 15,
        onTimeout: false,
    },
};

const web3 = new Web3(new Web3.providers.WebsocketProvider(url, options));
var subscription = web3.eth.subscribe("pendingTransactions", (err, res) => {  console.log(err)  });

(async () => {
    while (true) {    
        try{
            subscription.on("data", (txHash) => {
                
                      console.log(txHash)
              })
        
    }catch(err){

    }
}
})