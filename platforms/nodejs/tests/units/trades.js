const Policies = require('../../src/policies');
module.exports = [
    {
        testName: 'Get Trades On Token',
        purpose: 'it should return trades for a given token',
        method: 'GET',
        path: '/txns/trades/token?address=0xc48b4814faed1ccc885dd6fde62a6474aecbb19a',
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                }
            ]
        }
    },
    {
        testName: 'Get Trades On Pool',
        purpose: 'it should return trades for a given pool',
        method: 'GET',
        path: '/txns/trades/pool?address=0x185e32f3db8226a8363c31ca0453385f3f8dc126',
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                }
            ]
        }
    },
    {
        testName: 'Insert Trades',
        purpose: 'it should insert new trades',
        method: 'PUT',
        path: '/txns/trades/insert',
        body: {
            trades: [
                {
                    "tx": "0x06f725b9f8840137d30e286fb2ea5834f13cb240131348c5043da392c73cfedc",
                    "type": "sell",
                    "version": "2",
                    "tokensTransferred": 1000000,
                    "backingCurrencyValue": 0.19661551893361026,
                    "backingCurrencyType": "weth",
                    "blockNumber": 16394966,
                    "timestamp": 1673577791,
                    "backingCurrencyPrice": 1405.74,
                    "usd": 276.3902995857333,
                    "price": 0.00027639029958573334,
                    "pair": "0x185e32f3db8226a8363c31ca0453385f3f8dc1x26",
                    "origin": "0x0040fb8f6b3d98c050f4a9a3cf3414e3d7265dc2",
                    "token": "0xc48b4814faed1ccc885dd6fde62a6474aecbbx19a"
                },
                {
                    "tx": "0x90250f37e879caec2a8716a271920f33e8c098d1cd9103a8ddcf904b3f0488bfs",
                    "type": "buy",
                    "version": "2",
                    "tokensTransferred": 306889.633789378,
                    "backingCurrencyValue": 0.06023903325751776,
                    "backingCurrencyType": "weth",
                    "blockNumber": 16395466,
                    "timestamp": 1673583839,
                    "backingCurrencyPrice": 1412.8,
                    "usd": 85.10570618622108,
                    "price": 0.00027731697918682434,
                    "pair": "0x185e32f3db8226a8363c31ca0453385f3f8dc1x26",
                    "origin": "0x875553ed12850177f9e050907bfe9ae57840ff28",
                    "token": "0xc48b4814faed1ccc885dd6fde62a6474aecbbx19a"
                }
            ]
        },
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                }
            ]
        }
    }
]