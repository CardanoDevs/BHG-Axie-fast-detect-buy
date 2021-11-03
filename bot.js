const Web3 = require('web3');
const { ethers } = require('ethers');
const {GraphQLClient} = require('graphql-request');
const abiDecoder = require('abi-decoder');
const  chalk = require ('chalk');

const price               = 0.02 * 1000000000000000000
const roninweb3           = new Web3(new Web3.providers.HttpProvider("https://api.roninchain.com/rpc"));
const web3                = new Web3(new Web3.providers.HttpProvider("https://proxy.roninchain.com/free-gas-rpc"));
const marketAbi           = [{"inputs": [{"internalType": "uint256","name": "_tokenMaxOccurrences","type": "uint256"}, {"internalType": "contract IExchange","name": "_exchangeContract","type": "address"}, {"internalType": "uint256","name": "_ownerCut","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"}, {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_oldAdmin","type": "address"}, {"indexed": true,"internalType": "address","name": "_newAdmin","type": "address"}],"name": "AdminChanged","type": "event"}, {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_oldAdmin","type": "address"}],"name": "AdminRemoved","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "AuctionCancelled","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"indexed": false,"internalType": "uint256[]","name": "_startingPrices","type": "uint256[]"}, {"indexed": false,"internalType": "uint256[]","name": "_endingPrices","type": "uint256[]"}, {"indexed": false,"internalType": "contract IERC20[]","name": "_exchangeTokens","type": "address[]"}, {"indexed": false,"internalType": "uint256[]","name": "_durations","type": "uint256[]"}, {"indexed": false,"internalType": "uint256","name": "_startingTimestamps","type": "uint256"}],"name": "AuctionCreated","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "address","name": "_buyer","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"indexed": false,"internalType": "contract IERC20","name": "_token","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_totalPrice","type": "uint256"}],"name": "AuctionSuccessful","type": "event"}, {"anonymous": false,"inputs": [],"name": "Paused","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"indexed": false,"internalType": "address","name": "_exchangeTokens","type": "address"}],"name": "TokenAuctionCancelled","type": "event"}, {"anonymous": false,"inputs": [],"name": "Unpaused","type": "event"}, {"constant": true,"inputs": [],"name": "admin","outputs": [{"internalType": "address","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "","type": "address"}, {"internalType": "uint256","name": "","type": "uint256"}],"name": "auctions","outputs": [{"internalType": "address","name": "seller","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "cancelAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"internalType": "address","name": "_token","type": "address"}],"name": "cancelTokenAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "address","name": "_newAdmin","type": "address"}],"name": "changeAdmin","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "enum IExchange.TokenType[]","name": "_tokenTypes","type": "uint8[]"}, {"internalType": "address[]","name": "_tokenAddresses","type": "address[]"}, {"internalType": "uint256[]","name": "_tokenNumbers","type": "uint256[]"}, {"internalType": "uint256[]","name": "_startingPrices","type": "uint256[]"}, {"internalType": "uint256[]","name": "_endingPrices","type": "uint256[]"}, {"internalType": "contract IERC20[]","name": "_exchangeTokens","type": "address[]"}, {"internalType": "uint256[]","name": "_durations","type": "uint256[]"}],"name": "createAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"internalType": "uint256[]","name": "_startingPrices","type": "uint256[]"}, {"internalType": "uint256[]","name": "_endingPrices","type": "uint256[]"}, {"internalType": "contract IERC20[]","name": "_exchangeTokens","type": "address[]"}, {"internalType": "uint256[]","name": "_durations","type": "uint256[]"}],"name": "createAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": true,"inputs": [],"name": "exchangeContract","outputs": [{"internalType": "contract IExchange","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "getCurrentPrices","outputs": [{"internalType": "contract IERC20[]","name": "","type": "address[]"}, {"internalType": "uint256[]","name": "","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_tokenAddress","type": "address"}, {"internalType": "uint256","name": "_tokenNumber","type": "uint256"}],"name": "getTokenAuctions","outputs": [{"internalType": "address[]","name": "_sellers","type": "address[]"}, {"internalType": "uint256[]","name": "_listingIndexes","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_tokenAddress","type": "address"}, {"internalType": "uint256","name": "_tokenNumber","type": "uint256"}],"name": "getTokenAuctionsCount","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "isAuctionExisting","outputs": [{"internalType": "bool","name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [],"name": "ownerCut","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [],"name": "pause","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": true,"inputs": [],"name": "paused","outputs": [{"internalType": "bool","name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [],"name": "removeAdmin","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "revalidateAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "revalidateRelatedAuctions","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_newOwnerCut","type": "uint256"}],"name": "setOwnerCut","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_tokenMaxOccurrences","type": "uint256"}],"name": "setTokenMaxOccurrences","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "contract IERC20","name": "_token","type": "address"}, {"internalType": "uint256","name": "_bidAmount","type": "uint256"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"internalType": "uint256","name": "_listingState","type": "uint256"}],"name": "settleAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": true,"inputs": [],"name": "tokenMaxOccurrences","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [],"name": "unpause","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "contract IExchange","name": "_exchangeContract","type": "address"}],"name": "updateExchangeContract","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [],"name": "withdrawEther","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "contract IERC20","name": "_token","type": "address"}],"name": "withdrawToken","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}]
const marketAddress       = '0x213073989821f738A7BA3520C3D31a1F9aD31bBd';
const wethAddress         = '0xc99a6A985eD2Cac1ef41640596C5A5f9F4E19Ef5';
const walletAddress       = '0x7c2b36A1be98B2527778BB4165F528AB6Dc22C74';
const walletPrivateKey    = "0xc37e5edd84f3a8d7b6c90b52c5cd3aa32ab3c674c29ae54fa94d0af8c7aeb771";
const marketContract      = new web3.eth.Contract(marketAbi, marketAddress);
const threadNumber        = 20;
let   requestState        = true


const run =async() => {
  var previousNumber = 0
  console.log(chalk.green('\n\n\n░█████╗░██╗░░██╗██╗███████╗  ██████╗░██╗░░░██╗██╗░░░██╗  ██████╗░░█████╗░████████╗\n██╔══██╗╚██╗██╔╝██║██╔════╝  ██╔══██╗██║░░░██║╚██╗░██╔╝  ██╔══██╗██╔══██╗╚══██╔══╝\n███████║░╚███╔╝░██║█████╗░░  ██████╦╝██║░░░██║░╚████╔╝░  ██████╦╝██║░░██║░░░██║░░░\n██╔══██║░██╔██╗░██║██╔══╝░░  ██╔══██╗██║░░░██║░░╚██╔╝░░  ██╔══██╗██║░░██║░░░██║░░░\n██║░░██║██╔╝╚██╗██║███████╗  ██████╦╝╚██████╔╝░░░██║░░░  ██████╦╝╚█████╔╝░░░██║░░░\n╚═╝░░╚═╝╚═╝░░╚═╝╚═╝╚══════╝  ╚═════╝░░╚═════╝░░░░╚═╝░░░  ╚═════╝░░╚════╝░░░░╚═╝░░░\n\n Start Axie Buy bot...\n\n\n'))

  while (true){
  try{
    //--------------detect last block from ronin side chain and catch all transactions
    var blocknumber = await roninweb3.eth.getBlockNumber();
    if (previousNumber != blocknumber){
      previousNumber = blocknumber
      console.log(chalk.yellow("\n Bot is searching on", blocknumber , "th block."))
      //-------------create thred 
      var block = await roninweb3.eth.getBlock(blocknumber)
      for (let i = 0; i < threadNumber; i++) {
        scan(i , block, blocknumber)
      }
    }
  }catch(err){
  }
  }
}


const scan = async (index, block, blocknumber) => {
  try{
    if (block == null ) {return}
   


    for (let i = index; i < block.transactions.length -1 ; i+=threadNumber) {
      
      var transaction =await  roninweb3.eth.getTransaction(block.transactions[i])
      
      if (transaction == null){
        return
      }

      if (transaction.to === marketAddress ){
        
        abiDecoder.addABI(marketAbi);
        var decodedData = abiDecoder.decodeMethod(transaction.input);
        if (decodedData.name === "createAuction"){
          console.log("\n     Auction Create detected. start price is ",decodedData['params']['3']['value'] / 1000000000000000000,"ETH, end price is ", decodedData['params']['4']['value'] / 1000000000000000000,"ETH")
          var startingPrice = decodedData['params']['3']['value']
          var endingPrice   = decodedData['params']['4']['value']
          var id            = decodedData['params']['2']['value']
          if (parseInt(startingPrice) < price){
            


              console.log(chalk.green("\n Cheap axie detected. id is ", id, "Price is ",startingPrice / 1000000000000000000,"," ,endingPrice / 1000000000000000000, "ETH"))
              
              var variables = {
                "axieId": parseInt(id)
              }
              // get listing index and listing state from axie API
              const client = new GraphQLClient('https://graphql-gateway.axieinfinity.com/graphql', { headers: {} })
              let graphqlquery = "query GetAxieDetail($axieId: ID!) {\n  axie(axieId: $axieId) {\n    ...AxieDetail\n    __typename\n  }\n}\n\n fragment AxieBattleInfo on AxieBattleInfo {\n  banned\n }\n fragment AxieDetail on Axie {\n  id\n \n  battleInfo {\n    ...AxieBattleInfo\n    __typename\n  } auction {\n    ...AxieAuction\n    __typename\n  }\n}\n\nfragment AxieAuction on Auction {\n  timeLeft\n  suggestedPrice\n  seller\n  listingIndex\n  state\n}\n"
              let flag = true

              while (flag){
                let data
                data = await client.request(graphqlquery, variables)
                console.log(" \n     request to graphql for axie id : ", id  )
                if(data.axie.battleInfo.banned == true){
                  flag = false
                  console.log(chalk.red("\n this axie is a banned axie."))
                  requestState = true
                } 
                
                else {

                  if(data.axie.auction !== null){
                    
                    if (parseInt(data.axie.auction.suggestedPrice) > price ){
                      console.log(chalk.red("\n suggest price is over than limit price"))
                      requestState = true
                      return
                    }

                    else if ((parseInt(data.axie.auction.suggestedPrice) < price && data.axie.battleInfo.banned == false) || (parseInt(data.axie.auction.suggestedPrice) < 5000000000000000 && data.axie.battleInfo.banned == true )) {
                      // send transaction for buy a
                      console.log(chalk.green("\n Request result : axie's price is ", data.axie.auction.suggestedPrice / 1000000000000000000))
                      var ownerAddress = roninweb3.utils.toChecksumAddress(data.axie.auction.seller);
                      var buyprice = ethers.BigNumber.from((parseInt(data.axie.auction.suggestedPrice) + 500000000000000)+ '');
                      var listIndex = ethers.BigNumber.from(data.axie.auction.listingIndex+ '');
                      var listState = ethers.BigNumber.from(data.axie.auction.state + '');
                      let tx = {
                          from          : walletAddress,
                          to            : marketAddress,
                          data          : marketContract.methods.settleAuction(ownerAddress, wethAddress, buyprice, listIndex, listState).encodeABI(),
                          gasPrice      : '0',
                          nonce         : await web3.eth.getTransactionCount(walletAddress),
                          gas           : '1000000'
                      }
                      console.log(chalk.bgGreen("\n Sending transactions ..."))
                      var promise = await web3.eth.accounts.signTransaction(tx, walletPrivateKey)
                      requestState = true
                      await web3.eth.sendSignedTransaction(promise.rawTransaction).once('confirmation', () => {
                        console.log("\nAxie buy ok")
                        requestState = true
                      }).once('error', (e) => {
                        console.log(e)
                        requestState = true
                      })
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

run();