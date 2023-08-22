# Web3 Shards

High-level libraries for accessing blockchain data on EVM-compatible chains.

## Getting Started :wave:

> 📘 Get An API Key
> 
> To use the API, visit the discord group and request a key. <https://discord.com/invite/kJd8W7Nh7e>

We just started our beta program and have begun issuing keys. For a limited time, Web3 Shards data is free to access. Get more information by visiting the Discord group.

## Read the Docs 📘

- [Blocks API](https://web3-shards.readme.io/reference/blocks-block)
- [Price API](https://web3-shards.readme.io/reference/prices-pool)
- [Pools API](https://web3-shards.readme.io/reference/pools-search)
- [Projects API](https://web3-shards.readme.io/reference/projects-all)
- [Trades API](https://web3-shards.readme.io/reference/txns-trades-token)

## Connect to the API

```javascript
"use strict";
const Shards = require("web3-shards");

const api = Shards.API.Ethereum.V1;
api.configure({
    apiKey: "YOUR_API_KEY", // Join the discord to get your api key. https://discord.com/invite/kJd8W7Nh7e
    maxRequestsPerSecond:5, // client-side limiter to prevent accidental burning
    logger: 1               // 0=none,1=errors,2=verbose
});

const getTrendingProjects = async function() {
    const resp = await api.projects.getTrendingProjects('1h', 50000, 1.01, 500, 50000);
    console.log(resp)
}

getTrendingProjects();
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
