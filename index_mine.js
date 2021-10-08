const Web3 = require('web3');
const { ethers } = require('ethers');
const {GraphQLClient} = require('graphql-request');
let buyPrice = 30500000000000000;
let roninweb3           = new Web3(new Web3.providers.HttpProvider("https://proxy.roninchain.com/free-gas-rpc"));
let abi                 = [{"constant": false,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "contract IERC20","name": "_token","type": "address"}, {"internalType": "uint256","name": "_bidAmount","type": "uint256"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"internalType": "uint256","name": "_listingState","type": "uint256"}],"name": "settleAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}]
let marketAddress       = '0x213073989821f738A7BA3520C3D31a1F9aD31bBd';
let wethAddress         = '0xc99a6A985eD2Cac1ef41640596C5A5f9F4E19Ef5';
let walletAddress       = '0x76bD076f18b926407ce1473BBa4c77C047B10FC8';
let walletPrivateKey    = "0x086c236291f8053647cf69cdf5fa01a334c2967454d19b1599334a7e58c1dfa5";
let marketContract      = new roninweb3.eth.Contract(abi, marketAddress);

(async () => {
    while (true) {
        console.log("\n\n start!!! ")
        try{
          let response = []
          let variable = {
            "from": 0,
            "size": 4,
            "sort": "PriceAsc",
            "auctionType": "Sale",
            "criteria": {}
          }
          let query = "query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int) {\n  axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size) {\n    results {\n      ...AxieRowData\n    }\n  }\n}\n\nfragment AxieRowData on Axie {\n  id\n owner\n  auction {\n ...AxieAuction\n  }\n}\n \nfragment AxieAuction on Auction {\n suggestedPrice\n listingIndex\n state\n  currentPrice\n timeLeft\n }\n"
          const client = new GraphQLClient('https://graphql-gateway.axieinfinity.com/graphql', { headers: {} })
          await client.request(query, variable).then((data) => {
            if ( data['axies']['results']['0']['auction']['timeLeft'] >  60) {
              response = data['axies']['results']['0']
            } else if ( data['axies']['results']['1']['auction']['timeLeft'] > 60 ) {
              response = data['axies']['results']['1']
            } else if ( data['axies']['results']['2']['auction']['timeLeft'] > 60 ) {
              response = data['axies']['results']['2']
            } else if ( data['axies']['results']['3']['auction']['timeLeft'] > 60) {
              response = data['axies']['results']['3']
            } 
               console.log(response)
          })
          var result = response
        if (parseInt(result.auction.suggestedPrice) < buyPrice) {
            var ownerAddress = roninweb3.utils.toChecksumAddress(result.owner);
            var price = ethers.BigNumber.from(result.auction.suggestedPrice);
            var listIndex = ethers.BigNumber.from(result.auction.listingIndex);
            var listState = ethers.BigNumber.from(result.auction.state);
            console.log("1111")
            let tx = {
                from          : walletAddress,
                to            : marketAddress,
                data          : marketContract.methods.settleAuction(ownerAddress, wethAddress, price, listIndex, listState).encodeABI(),
                gasPrice      : '0',
                nonce         : await roninweb3.eth.getTransactionCount(walletAddress),
                gas           : '1000000'
              }
              console.log(tx)
             console.log("before send")
             var promise = await roninweb3.eth.accounts.signTransaction(tx, walletPrivateKey)
             await roninweb3.eth.sendSignedTransaction(promise.rawTransaction).once('confirmation', () => {
               console.log("ok")
               process.exit();
    
            }) .once('error', (e) => {
              console.log(e)
              process.exit();
            })
        }
        } catch(e){
            console.log(e)
        }
    }
})();