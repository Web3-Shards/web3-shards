'use strict';

const ShardsSocketClient = require("../src/socketClient");
const {EVM} = require('../src/defs');

const run = function() {
    const client = new ShardsSocketClient({
        chain: EVM.Ethereum,
        shardsApiKey: 'mock-api-key',
        shardsWebsocketId: 'ae62bc92-d545-4926-b889-sub11179035l'
    });
    client.connect();
    client.onData = function(_log) {
        console.log(_log);
    }
}

run();