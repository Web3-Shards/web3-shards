"use strict";
const Shards = require("web3-shards");

const shards = Shards.API.Ethereum.V1;
shards.configure({
    apiKey: "YOUR_API_KEY", // get yours at https://dev.web3shards.io
    maxRequestsPerSecond:5, // client-side limiter to prevent accidental burning
    logger: 1               // 0=none,1=errors,2=verbose
});

const getLatestBlock = async function() {
    const resp = await shards.blocks.getLatestBlock();
    console.log(resp)
}

getLatestBlock();