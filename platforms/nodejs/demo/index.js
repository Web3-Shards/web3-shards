"use strict";

const ShardsClient = require("../");

const shards = ShardsClient.Ethereum.V1;
shards.configure({
    apiKey: "4d5ac613-474f-4c73-8be0-6122093a065c",
    maxRequestsPerSecond:5,
    logger: 1
});

const getTradesOnToken = async function() {
    let page = 1;
    let resp = await shards.transactions.getTradesOnToken("0xc48b4814faed1ccc885dd6fde62a6474aecbb19a", page);
    let data = resp.trades;
    while (resp.nextPage != null) {
        resp = await shards.transactions.getTradesOnToken("0xc48b4814faed1ccc885dd6fde62a6474aecbb19a", ++page);
        if (resp.error) {
            resp.nextPage = page--;
            console.log(resp.error)
            continue;
        }
        data = data.concat(resp.trades)
    }
    console.log(data.length);
}

const getLatestBlock = async function() {
    const resp = await shards.blocks.getLatestBlock();
    console.log(resp)
}

const demo = async function() {
    // await getTradesOnToken();
    await getLatestBlock();
}

demo();