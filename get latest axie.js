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
  "operationName": "GetAxieLatest",
    "variables": {
      "from": 0,
      "size": 1,
      "sort": "Latest",
      "auctionType": "Sale",
      "criteria": {}
    },
    "query": "query GetAxieLatest($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {\n  axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {\n    total\n    results {\n      ...AxieRowData\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment AxieRowData on Axie {\n  id\n  image\n  class\n  name\n  genes\n  owner\n  class\n  stage\n  title\n  breedCount\n  level\n  parts {\n    ...AxiePart\n    __typename\n  }\n  stats {\n    ...AxieStats\n    __typename\n  }\n  auction {\n    ...AxieAuction\n    __typename\n  }\n  __typename\n}\n\nfragment AxiePart on AxiePart {\n  id\n  name\n  class\n  type\n  specialGenes\n  stage\n  abilities {\n    ...AxieCardAbility\n    __typename\n  }\n  __typename\n}\n\nfragment AxieCardAbility on AxieCardAbility {\n  id\n  name\n  attack\n  defense\n  energy\n  description\n  backgroundUrl\n  effectIconUrl\n  __typename\n}\n\nfragment AxieStats on AxieStats {\n  hp\n  speed\n  skill\n  morale\n  __typename\n}\n\nfragment AxieAuction on Auction {\n  startingPrice\n  endingPrice\n  startingTimestamp\n  endingTimestamp\n  duration\n  timeLeft\n  currentPrice\n  currentPriceUSD\n  suggestedPrice\n  seller\n  listingIndex\n  state\n  __typename\n}\n"
  });


  var config = {
    method: 'post',
    url: 'https://graphql-gateway.axieinfinity.com/graphql',
    headers: {
        'Content-Type': 'application/json'
    },
    data: data,
    timeout: 5000,
};




(async () => {
       
  try{

    while(true){
      var response = await axios(config)
      logger.info("results received after "+response.timings.elapsedTime)
      var result = response.data.data.axies.results[0].auction.timeLeft
      console.log(result)
  }
} catch(e){
  logger.warn(e)
    }
})();