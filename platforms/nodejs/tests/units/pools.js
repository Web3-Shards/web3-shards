
module.exports = [
    {
        testName: 'Get Token With Pool Address',
        purpose: 'it should return a pool using a pool address',
        method: 'GET',
        path: '/pools/search',
        query: { chain: 'eth', query: '0x9d3b477880d931988cc1edf859846339bcc909b3' },
        expected: { 
            $match: [
                {
                    key: 'pools.0.pool_address',
                    value: '0x9d3b477880d931988cc1edf859846339bcc909b3'
                }
            ]
        }
    },
    {
        testName: 'Get Token With Token Address',
        purpose: 'it should return a pool using a token address, including an array of pools',
        method: 'GET',
        path: '/pools/search',
        query: { chain: 'eth', query: '0x9813037ee2218799597d83d4a5b6f3b6778218d9' },
        expected: { 
            statusCode: 200
        }
    },
    {
        testName: 'Get Token With Token Name',
        purpose: 'it should return an array of tokens using a token name, each including an array of pools',
        method: 'GET',
        path: '/pools/search',
        query: { chain: 'eth', query: 'bone shibaswap' },
        expected: { 
            statusCode: 200
        }
    },
    {
        testName: 'Get Token With Token Symbol',
        purpose: 'it should return an array of tokens using a token symbol, each including an array of pools',
        method: 'GET',
        path: '/pools/search?chain=eth&query=bone',
        expected: { 
            statusCode: 200
        }
    },
    {
        testName: 'Insert Pools',
        purpose: 'it should insert an array of pools',
        method: 'PUT',
        path: '/pools/insert',
        query: { chain: 'eth' },
        body: {
            pools: [
                {
                    "pool_address": "testpool4",
                    "address": "testaddress4",
                    "base": {
                        "name": "Wrapped Ether",
                        "symbol": "WETH",
                        "decimals": "18",
                        "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
                    },
                    "block": 14628562,
                    "chain": "ETH",
                    "decimals": "9",
                    "exchange": "UniswapV2",
                    "name": "testname4",
                    "symbol": "testsymbol4",
                    "transactionHash": "testhash4",
                    "price": 0.014
                },
                {
                    "pool_address": "testpool2",
                    "address": "testaddress2",
                    "base": {
                        "name": "Wrapped Ether",
                        "symbol": "WETH",
                        "decimals": "18",
                        "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
                    },
                    "block": 14628562,
                    "chain": "ETH",
                    "decimals": "9",
                    "exchange": "UniswapV2",
                    "name": "testname2",
                    "symbol": "testsymbol2",
                    "transactionHash": "testhash2",
                    "price": 0.012
                },
                {
                    "pool_address": "testpool3",
                    "address": "testaddress3",
                    "base": {
                        "name": "Wrapped Ether",
                        "symbol": "WETH",
                        "decimals": "18",
                        "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
                    },
                    "block": 14628562,
                    "chain": "ETH",
                    "decimals": "9",
                    "exchange": "UniswapV2",
                    "name": "testname3",
                    "symbol": "testsymbol3",
                    "transactionHash": "testhash3",
                    "price": 0.015
                }
            ]
        },
        expected: { 
            statusCode: 200
        }
    },
    {
        testName: 'Update Pool',
        purpose: 'it should update a pool',
        method: 'POST',
        path: '/pools/update',
        query: { chain: 'eth' },
        body: {
            "pool_address": "testpool3",
            "price": 0.015,
            "stats": {
                "fdmc": 123000
            }
        },
        expected: { 
            statusCode: 200
        }
    },
]