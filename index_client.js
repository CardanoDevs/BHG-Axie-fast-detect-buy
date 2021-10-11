let currentUser = 3;
const winston = require('winston');
var axios = require('axios');
const axiosTime = require('axios-time');
axiosTime(axios);
const Web3 = require('web3');
const { ethers } = require('ethers');
const initializeLogger = require("./initializeLogger");
initializeLogger("bot", currentUser);
const logger = winston.loggers.get(currentUser);
var data = JSON.stringify({
    "operationName": "GetAxieBriefList",
    "variables": {
      "from": 0,
      "size": 2,
      "sort": "Latest",
      "auctionType": "Sale",
      "criteria": {}
    },
    "query": "query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {\n  axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {\n    total\n    results {\n      ...AxieBrief\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment AxieBrief on Axie {\n  id\n  name\n  stage\n  class\n  breedCount\n  image\n  title\n  battleInfo {\n    banned\n    __typename\n  }\n  auction {\n    currentPrice\n    currentPriceUSD\n  timeLeft\n listingState\n  __typename\n  }\n    __typename\n}\n"
  });
  var config = {
    method: 'post',
    url: 'https://graphql-gateway.axieinfinity.com/graphql',
    headers: {
        'Content-Type': 'application/json'
    },
    data: data,
    timeout: 1300,
};
let buyPrice = 10000;

let roninweb3           = new Web3(new Web3.providers.HttpProvider("https://proxy.roninchain.com/free-gas-rpc"));
let abi                 = [{"inputs": [{"internalType": "uint256","name": "_tokenMaxOccurrences","type": "uint256"}, {"internalType": "contract IExchange","name": "_exchangeContract","type": "address"}, {"internalType": "uint256","name": "_ownerCut","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"}, {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_oldAdmin","type": "address"}, {"indexed": true,"internalType": "address","name": "_newAdmin","type": "address"}],"name": "AdminChanged","type": "event"}, {"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_oldAdmin","type": "address"}],"name": "AdminRemoved","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "AuctionCancelled","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"indexed": false,"internalType": "uint256[]","name": "_startingPrices","type": "uint256[]"}, {"indexed": false,"internalType": "uint256[]","name": "_endingPrices","type": "uint256[]"}, {"indexed": false,"internalType": "contract IERC20[]","name": "_exchangeTokens","type": "address[]"}, {"indexed": false,"internalType": "uint256[]","name": "_durations","type": "uint256[]"}, {"indexed": false,"internalType": "uint256","name": "_startingTimestamps","type": "uint256"}],"name": "AuctionCreated","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "address","name": "_buyer","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"indexed": false,"internalType": "contract IERC20","name": "_token","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_totalPrice","type": "uint256"}],"name": "AuctionSuccessful","type": "event"}, {"anonymous": false,"inputs": [],"name": "Paused","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_seller","type": "address"}, {"indexed": false,"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"indexed": false,"internalType": "address","name": "_exchangeTokens","type": "address"}],"name": "TokenAuctionCancelled","type": "event"}, {"anonymous": false,"inputs": [],"name": "Unpaused","type": "event"}, {"constant": true,"inputs": [],"name": "admin","outputs": [{"internalType": "address","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "","type": "address"}, {"internalType": "uint256","name": "","type": "uint256"}],"name": "auctions","outputs": [{"internalType": "address","name": "seller","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "cancelAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"internalType": "address","name": "_token","type": "address"}],"name": "cancelTokenAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "address","name": "_newAdmin","type": "address"}],"name": "changeAdmin","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "enum IExchange.TokenType[]","name": "_tokenTypes","type": "uint8[]"}, {"internalType": "address[]","name": "_tokenAddresses","type": "address[]"}, {"internalType": "uint256[]","name": "_tokenNumbers","type": "uint256[]"}, {"internalType": "uint256[]","name": "_startingPrices","type": "uint256[]"}, {"internalType": "uint256[]","name": "_endingPrices","type": "uint256[]"}, {"internalType": "contract IERC20[]","name": "_exchangeTokens","type": "address[]"}, {"internalType": "uint256[]","name": "_durations","type": "uint256[]"}],"name": "createAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"internalType": "uint256[]","name": "_startingPrices","type": "uint256[]"}, {"internalType": "uint256[]","name": "_endingPrices","type": "uint256[]"}, {"internalType": "contract IERC20[]","name": "_exchangeTokens","type": "address[]"}, {"internalType": "uint256[]","name": "_durations","type": "uint256[]"}],"name": "createAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": true,"inputs": [],"name": "exchangeContract","outputs": [{"internalType": "contract IExchange","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "getCurrentPrices","outputs": [{"internalType": "contract IERC20[]","name": "","type": "address[]"}, {"internalType": "uint256[]","name": "","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_tokenAddress","type": "address"}, {"internalType": "uint256","name": "_tokenNumber","type": "uint256"}],"name": "getTokenAuctions","outputs": [{"internalType": "address[]","name": "_sellers","type": "address[]"}, {"internalType": "uint256[]","name": "_listingIndexes","type": "uint256[]"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_tokenAddress","type": "address"}, {"internalType": "uint256","name": "_tokenNumber","type": "uint256"}],"name": "getTokenAuctionsCount","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "isAuctionExisting","outputs": [{"internalType": "bool","name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": true,"inputs": [],"name": "ownerCut","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [],"name": "pause","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": true,"inputs": [],"name": "paused","outputs": [{"internalType": "bool","name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [],"name": "removeAdmin","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "revalidateAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_listingIndex","type": "uint256"}],"name": "revalidateRelatedAuctions","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_newOwnerCut","type": "uint256"}],"name": "setOwnerCut","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "uint256","name": "_tokenMaxOccurrences","type": "uint256"}],"name": "setTokenMaxOccurrences","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "address","name": "_seller","type": "address"}, {"internalType": "contract IERC20","name": "_token","type": "address"}, {"internalType": "uint256","name": "_bidAmount","type": "uint256"}, {"internalType": "uint256","name": "_listingIndex","type": "uint256"}, {"internalType": "uint256","name": "_listingState","type": "uint256"}],"name": "settleAuction","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": true,"inputs": [],"name": "tokenMaxOccurrences","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}, {"constant": false,"inputs": [],"name": "unpause","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "contract IExchange","name": "_exchangeContract","type": "address"}],"name": "updateExchangeContract","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [],"name": "withdrawEther","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}, {"constant": false,"inputs": [{"internalType": "contract IERC20","name": "_token","type": "address"}],"name": "withdrawToken","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}]
let marketAddress       = roninweb3.utils.toChecksumAddress('0x213073989821f738a7ba3520c3d31a1f9ad31bbd');
let wethAddress         = roninweb3.utils.toChecksumAddress('0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5');
let walletAddress       = roninweb3.utils.toChecksumAddress("0xb1afe89ed7063fca87206e968535f5c423970e6d");
let walletPrivateKey    = "xx";
let marketContract      = new roninweb3.eth.Contract(abi, marketAddress);

(async () => {
    while (true) {
        try{
        var response = await axios(config)
        logger.info("results received after "+response.timings.elapsedTime)
        var result = response.data.data.axies.results[0];
        console.log(result)
        if (parseInt(result.auction.currentPriceUSD) < buyPrice) {
            logger.info("would buy")
            var ownerAddress = roninweb3.utils.toChecksumAddress(result.owner);
            var price = ethers.BigNumber.from(result.auction.suggestedPrice);
            var listIndex = ethers.BigNumber.from(result.auction.listingIndex);
            var listState = ethers.BigNumber.from(result.auction.state);
            let tx = {
                from          : walletAddress,
                to            : marketAddress,
                data          : marketContract.methods.settleAuction(ownerAddress, wethAddress, price, listIndex, listState).encodeABI(),
                gasPrice      :  '0',
                nonce         : await roninweb3.eth.getTransactionCount(walletAddress),
                gas           : '1000000',
              }
            logger.info("before send")
            var promise = await roninweb3.eth.accounts.signTransaction(tx, walletPrivateKey)
            roninweb3.eth.sendSignedTransaction(promise.rawTransaction)
            logger.info("sent for "+JSON.stringify(result))
            process.exit();
        }
        } catch(e){
            logger.warn(e)
        }
    }
})();