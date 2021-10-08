const Web3 = require('web3')

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


let web3  = new Web3(new Web3.providers.HttpProvider("https://proxy.roninchain.com/free-gas-rpc"));



(async () => {
    while (true) {

    var subscription = web3.eth.subscribe('pendingTransactions', function(error, result){
        if (!error)
            console.log(result);
    })
    .on("data", function(transaction){
        console.log(transaction);
    });

}})