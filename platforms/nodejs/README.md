# Web3 Shards

High-level libraries for accessing blockchain data on Ethereum, Binance Smart Chain, Arbitrum, & Shibarium.

## Getting Started :wave:

> 📘 Get An API Key
> 

To use the API, create an account at https://web3shards.io/console. Create unlimited API keys. 

## Read the Docs 📘

- [Docs](https://web3-shards.readme.io/reference/getting-started-1)

## Connect to the API

```javascript
const Shards = require("web3-shards");

const api = Shards.API.Ethereum.V1;
api.configure({
    apiKey: "YOUR_API_KEY", // Create an account to get your api key https://web3shards.io/console
    maxRequestsPerSecond:5, // client-side limiter to prevent accidental burning
    logger: 1               // 0=none,1=errors,2=verbose
});

```

### Transfers
```javascript
async api.transfers.getTransfersOnToken(_token, _type, _page=1)
async api.transfers.getTransfersOnWallet(_wallet, _type, _page=1)
async api.transfers.getTransfersOnWalletForToken(_wallet, _token, _type, _page=1)
```
### Balances
```javascript
async api.balances.getLatestBalancesOnWallet(_wallet, _type, _page=1)
async api.balances.getBalancesOnToken(_token, _type, _page=1)
async api.balances.getBalancesOnWallet(_wallet, _type, _page=1)
async api.balances.getBalancesOnWalletForToken(_wallet, _token, _type, _page=1)
```
### Holders
```javascript
async api.holders.getHolderCount(_token, _type)
async api.holders.getHolderList(_token, _type, _page=1)
```
### Markets
```javascript
async api.market.getMarketStats(_startTime, _endTime, _page=1)
```
### Prices
```javascript
async api.prices.getNativePrice()
async api.prices.getAllNativePrices()
async api.prices.getNativePriceAtTime(_timestamp)
async api.prices.getNativePriceLines(_startTime, _endTime, _page=1)
async api.prices.getPoolPrice(_address)
async api.prices.getLatestPoolPriceCandle(_address, _interval=Period.dataValue(Period.MINUTE_1))
async api.prices.getPoolPriceAtTime(_address, _timestamp)
async api.prices.getPoolPriceLines(_address, _startTime, _endTime, _interval=Period.dataValue(Period.HOUR_1), _page=1)
async api.prices.getPoolPriceCandles(_address, _startTime, _endTime, _interval=Period.dataValue(Period.HOUR_1), _page=1)
async api.prices.getBatchedPoolPrices(_pools)
```
### Projects
```javascript
async api.projects.getAllProjects(_page=1)
async api.projects.getActiveProjects(_page=1)
async api.projects.getStaleProjects(_page=1)
async api.projects.getDeadProjects(_page=1)
async api.projects.getTrendingProjects(_period, _volume, _priceChange, _tradeCount, _trueValue, _page=1)
async api.projects.getProjectWithPoolAddress(_address)
async api.projects.getProjectWithTokenAddress(_address)
async api.projects.searchProject(_query)
async api.projects.getProjectsBatchedByPools(_pool_addresses)
async api.projects.getProjectsBatchedByTokens(_tokens)
```
### Transactions
```javascript
async api.transactions.getTradesOnPool(_pool, _page=1, _origin=null, _starttime=null, _endtime=null)
async api.transactions.getTradesOnToken(_token, _page=1, _origin=null, _starttime=null, _endtime=null)
```
### Blocks
```javascript
async api.blocks.getLatestBlock()
async api.blocks.getBlockAtTimestamp(_timestamp)
async api.blocks.getBlock(_block)
async api.blocks.getBlocksInBlockRange(_from, _to)
async api.blocks.getBlocksInTimeRange(_from, _to)
async api.blocks.getBlocks(_blocks)
```
### EVM
```javascript
async api.evm.getNativeBalance(_address)
```

## Connect With Websockets

```javascript
const Shards = require('web3-shards');

Shards.Sockets
.createConnection({
    chain: EVM.Ethereum,
    shardsApiKey: 'your-api-key',
    shardsWebsocketId: 'your-websocket-id'
})
.subscribe((dataType, data)=>{
    console.log(data);
})
.onDisconnect(()=>{
    console.log('disconnected');
})
.onError(_err=>{
    console.log(_err)
});
```

## To Do

We are working on libraries for Python, Golang, C#, React, and more.
