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
