
const Web3 = require('web3');
const { ethers } = require('ethers');
const {GraphQLClient} = require('graphql-request');
const abiDecoder = require('abi-decoder')


let price = 100000000000000000;
let roninweb3           = new Web3(new Web3.providers.HttpProvider("https://api.roninchain.com/rpc"));
let web3           = new Web3(new Web3.providers.HttpProvider("https://proxy.roninchain.com/free-gas-rpc"));
let abi                 = [{"constant": false,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "contract IERC20","name": "_token","type": "address"}, {"internalType": "uint256","name": "_bidAmount","type": "uint256"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"internalType": "uint256","name": "_listingState","type": "uint256"}],"name": "settleAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}]
let marketAbi           = [{"inputs": [{"internalType": "uint256","name": "_tokenMaxOccurrences","type": "uint256"}, {"internalType": "contract IExchange","name": "_exchangeContract","type": "address"}, {"internalType": "uint256","name": "_ownerCut","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"}, {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_oldAdmin","type": "address"}, {"indexed": true,"internalType": "address","name": "_newAdmin","type": "address"}],"name": "AdminChanged","type": "event"}, {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_oldAdmin","type": "address"}],"name": "AdminRemoved","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "AuctionCancelled","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"indexed": false,"internalType": "uint256[]","name": "_startingPrices","type": "uint256[]"}, {"indexed": false,"internalType": "uint256[]","name": "_endingPrices","type": "uint256[]"}, {"indexed": false,"internalType": "contract IERC20[]","name": "_exchangeTokens","type": "address[]"}, {"indexed": false,"internalType": "uint256[]","name": "_durations","type": "uint256[]"}, {"indexed": false,"internalType": "uint256","name": "_startingTimestamps","type": "uint256"}],"name": "AuctionCreated","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "address","name": "_buyer","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"indexed": false,"internalType": "contract IERC20","name": "_token","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_totalPrice","type": "uint256"}],"name": "AuctionSuccessful","type": "event"}, {"anonymous": false,"inputs": [],"name": "Paused","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"indexed": false,"internalType": "address","name": "_exchangeTokens","type": "address"}],"name": "TokenAuctionCancelled","type": "event"}, {"anonymous": false,"inputs": [],"name": "Unpaused","type": "event"}, {"constant": true,"inputs": [],"name": "admin","outputs": [{"internalType": "address","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "","type": "address"}, {"internalType": "uint256","name": "","type": "uint256"}],"name": "auctions","outputs": [{"internalType": "address","name": "seller","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "cancelAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"internalType": "address","name": "_token","type": "address"}],"name": "cancelTokenAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "address","name": "_newAdmin","type": "address"}],"name": "changeAdmin","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "enum IExchange.TokenType[]","name": "_tokenTypes","type": "uint8[]"}, {"internalType": "address[]","name": "_tokenAddresses","type": "address[]"}, {"internalType": "uint256[]","name": "_tokenNumbers","type": "uint256[]"}, {"internalType": "uint256[]","name": "_startingPrices","type": "uint256[]"}, {"internalType": "uint256[]","name": "_endingPrices","type": "uint256[]"}, {"internalType": "contract IERC20[]","name": "_exchangeTokens","type": "address[]"}, {"internalType": "uint256[]","name": "_durations","type": "uint256[]"}],"name": "createAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"internalType": "uint256[]","name": "_startingPrices","type": "uint256[]"}, {"internalType": "uint256[]","name": "_endingPrices","type": "uint256[]"}, {"internalType": "contract IERC20[]","name": "_exchangeTokens","type": "address[]"}, {"internalType": "uint256[]","name": "_durations","type": "uint256[]"}],"name": "createAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": true,"inputs": [],"name": "exchangeContract","outputs": [{"internalType": "contract IExchange","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "getCurrentPrices","outputs": [{"internalType": "contract IERC20[]","name": "","type": "address[]"}, {"internalType": "uint256[]","name": "","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_tokenAddress","type": "address"}, {"internalType": "uint256","name": "_tokenNumber","type": "uint256"}],"name": "getTokenAuctions","outputs": [{"internalType": "address[]","name": "_sellers","type": "address[]"}, {"internalType": "uint256[]","name": "_listingIndexes","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_tokenAddress","type": "address"}, {"internalType": "uint256","name": "_tokenNumber","type": "uint256"}],"name": "getTokenAuctionsCount","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "isAuctionExisting","outputs": [{"internalType": "bool","name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [],"name": "ownerCut","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [],"name": "pause","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": true,"inputs": [],"name": "paused","outputs": [{"internalType": "bool","name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [],"name": "removeAdmin","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "revalidateAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "revalidateRelatedAuctions","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_newOwnerCut","type": "uint256"}],"name": "setOwnerCut","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_tokenMaxOccurrences","type": "uint256"}],"name": "setTokenMaxOccurrences","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "contract IERC20","name": "_token","type": "address"}, {"internalType": "uint256","name": "_bidAmount","type": "uint256"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"internalType": "uint256","name": "_listingState","type": "uint256"}],"name": "settleAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": true,"inputs": [],"name": "tokenMaxOccurrences","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [],"name": "unpause","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "contract IExchange","name": "_exchangeContract","type": "address"}],"name": "updateExchangeContract","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [],"name": "withdrawEther","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "contract IERC20","name": "_token","type": "address"}],"name": "withdrawToken","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}]
let marketAddress       = '0x213073989821f738A7BA3520C3D31a1F9aD31bBd';
let wethAddress         = '0xc99a6A985eD2Cac1ef41640596C5A5f9F4E19Ef5';
let walletAddress       = '0x76bD076f18b926407ce1473BBa4c77C047B10FC8';
let walletPrivateKey    = "0x086c236291f8053647cf69cdf5fa01a334c2967454d19b1599334a7e58c1dfa5";

let marketContract      = new web3.eth.Contract(marketAbi, marketAddress);
let threads = 1;


const run = async (index) => {
    while (true) {
      try{
        let prev = 0;
        var blocknumber = await roninweb3.eth.getBlockNumber();
        if (blocknumber != prev){
            prev = blocknumber
        var block = await roninweb3.eth.getBlock(blocknumber)
        for (let i = index ; i < block.transactions.length; i+= threads) {
          console.log(i+1, "th transaction checking")
          var transaction = await roninweb3.eth.getTransactionFromBlock(blocknumber, i)
          if (transaction.to === "0x213073989821f738A7BA3520C3D31a1F9aD31bBd" ){
            abiDecoder.addABI(marketAbi);
            var decodedData = abiDecoder.decodeMethod(transaction.input);
            
            if (decodedData.name === "createAuction"){
              console.log(decodedData['params']['3']['value'], decodedData['params']['4']['value'])

              if ((parseInt(decodedData['params']['3']['value']) < price )){
                console.log("auction is created! \n", decodedData)
                var id = decodedData['params']['2']['value']
                var startingPrice = decodedData['params']['3']['value']
                  console.log("id is", id, "price is ",startingPrice)
                  var variables = {
                    "axieId": parseInt(id)
                  }
                  const client = new GraphQLClient('https://graphql-gateway.axieinfinity.com/graphql', { headers: {} })
                  let graphqlquery = "query GetAxieDetail($axieId: ID!) {\n  axie(axieId: $axieId) {\n    ...AxieDetail\n    __typename\n  }\n}\n\n fragment AxieBattleInfo on AxieBattleInfo {\n  banned\n }\n fragment AxieDetail on Axie {\n  id\n \n  battleInfo {\n    ...AxieBattleInfo\n    __typename\n  } auction {\n    ...AxieAuction\n    __typename\n  }\n}\n\nfragment AxieAuction on Auction {\n  timeLeft\n  suggestedPrice\n  seller\n  listingIndex\n  state\n}\n"
                  let flag = true
                  while (flag){
                    let data
                      data = await client.request(graphqlquery, variables)
                      console.log(data)
                      console.log(data.axie.battleInfo.banned)
                    if(data.axie.auction !== null){
                      if (parseInt(data.axie.auction.suggestedPrice)<price && data.axie.battleInfo.banned == false) {
                        var ownerAddress = web3.utils.toChecksumAddress(data.axie.auction.seller);
                        var buyprice = ethers.BigNumber.from((parseInt(data.axie.auction.suggestedPrice)+ 1000000000000000) + '');
                        var listIndex = ethers.BigNumber.from(data.axie.auction.listingIndex);
                        var listState = ethers.BigNumber.from(data.axie.auction.state);
                        let tx = {
                            from          : walletAddress,
                            to            : marketAddress,
                            data          : marketContract.methods.settleAuction(ownerAddress, wethAddress, buyprice, listIndex, listState).encodeABI(),
                            gasPrice      : '0',
                            nonce         : await roninweb3.eth.getTransactionCount(walletAddress),
                            gas           : '1000000'
                          }
                         console.log(tx)
                         console.log("before send")
                         var promise = await web3.eth.accounts.signTransaction(tx, walletPrivateKey)
                        //  await web3.eth.sendSignedTransaction(promise.rawTransaction).once('confirmation', () => {
                        //    console.log("ok")
                        // }) .once('error', (e) => {
                        //   console.log(e)
                        // })
                      } else {
                        break
                      }
                    }
                  }
              }
            }
          }
        } 
         }
      }catch(err){
    }
  }
}
const main = () =>{
    for (let i = 0; i < threads; i++) {
        run(i);
    }
}
main()