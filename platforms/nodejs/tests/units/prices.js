module.exports = [
    {
        testName: 'Get Native Price',
        purpose: 'it should return the price of a native token',
        method: 'GET',
        path: '/prices/native?token=eth',
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key:'token',
                    value: 'ETHLIVE'
                }
            ]
        }
    },
    {
        testName: 'Get Native Price At Timestamp',
        purpose: 'it should return the historical price of a native token',
        method: 'GET',
        path: '/prices/history/native?token=eth&timestamp=1688912041',
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'timestamp',
                    value: 1688912100
                },
                {
                    key: 'price',
                    value: 1860.34
                }
            ]
        }
    },
    {
        testName: 'Get All Native Prices',
        purpose: 'it should return the price of all native tokens',
        method: 'GET',
        path: '/prices/native?token=*',
        expected: {
            $match: [
                {
                    key: 'prices',
                    $foreach: native=>{
                        return native.price != null;
                    }
                }
            ]
        }
    },
    {
        testName: 'Get Invalid Native Price',
        purpose: 'it should return 404',
        method: 'GET',
        path: '/prices/native?token=abc',
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 204
                }
            ]
        }
    },
    {
        testName: 'Get Native Price In Time Range',
        purpose: 'it should return the historical price points within a time range',
        method: 'GET',
        path: '/prices/history/lines/native?token=eth&starttime=1642387452&endtime=1643979452',
        expected: {
            $match: [
                {
                    key: 'lines',
                    $foreach: line=>{
                        return line.price != null;
                    }
                },
            ]
        }
    },
    {
        testName: 'Update Live Native Prices',
        purpose: 'it should update a list of live native prices',
        method: 'POST',
        path: '/prices/native/update',
        body: [
            {
                "token": "token3",
                "date": "date",
                "timestamp": "timestamp",
                "price": "price"
            },
            {
                "token": "token",
                "date": "date",
                "timestamp": "timestamp",
                "price": "price"
            },
            {
                "token": "token2",
                "date": "date",
                "timestamp": "timestamp",
                "price": "price"
            }
        ],
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
            ]
        }
    },
    {
        testName: 'Insert Native Prices',
        purpose: 'it should insert a list of native prices',
        method: 'PUT',
        path: '/prices/history/native/insert',
        body: [
            {
                "token": "token3",
                "date": "date",
                "timestamp": "timestamp",
                "price": "price"
            },
            {
                "token": "token",
                "date": "date",
                "timestamp": "timestamp",
                "price": "price"
            },
            {
                "token": "token2",
                "date": "date",
                "timestamp": "timestamp",
                "price": "price"
            }
        ],
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
            ]
        }
    },
    {
        testName: 'Get Pool Price',
        purpose: 'it should return the price of a pool',
        method: 'GET',
        path: '/prices/pool?address=0x2c0be28a222a21b9e3a237f72b20ee58dc1af111',
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
        testName: 'Get Latest Pool Price Candle',
        purpose: 'it should return the price of a pool',
        method: 'GET',
        path: '/prices/candles/latest/pool?address=0x2c0be28a222a21b9e3a237f72b20ee58dc1af111&interval=1m',
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
        testName: 'Get Pool Price At Timestamp',
        purpose: 'it should return the historical price of a pool',
        method: 'GET',
        path: '/prices/history/pool?address=0x2c0be28a222a21b9e3a237f72b20ee58dc1af111&timestamp=1688915290',
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
        testName: 'Get Pool Price In Line Format',
        purpose: 'it should return the historical price range of a pool with line data',
        method: 'GET',
        path: '/prices/history/lines/pool?address=0xd001d59a204a55c641d65034d8ef719c7592f276&interval=1m&startTime=1688908259&endTime=1688998260',
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'lines',
                    $foreach: line=>{
                        return line.price != null &
                         line.time != null &
                         line.volume != null;
                    }
                }
            ]
        }
    },
    {
        testName: 'Get Pool Price In Candle Format',
        purpose: 'it should return the historical price range of a pool with line data',
        method: 'GET',
        path: '/prices/history/candles/pool?address=0xd001d59a204a55c641d65034d8ef719c7592f276&interval=1m&startTime=1688908259&endTime=1688998260',
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'candles',
                    $foreach: candle=>{
                        return candle.time != null &&
                            candle.volume != null &
                            candle.open != null &
                            candle.close != null &
                            candle.high != null &&
                            candle.low != null;
                    }
                }
            ]
        }
    },
    {
        testName: 'Insert Pool Candles',
        purpose: 'it should insert new OHLCV values',
        method: 'PUT',
        path: '/prices/history/candles/insert',
        body: [
            {
                "_id":"testaddr1-1m-test",
                "price": {
                    "low":0,
                    "timestamp":123456789
                },
                "pool_interval": "testaddr1-1m"
            },
            {
                "_id":"testaddr1-3m-test",
                "price": {
                    "low":0,
                    "timestamp":123456789
                },
                "pool_interval": "testaddr1-3m"
            }
        ],
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
        testName: 'Update Price Series',
        purpose: 'it should update the values of some OHLCV data',
        method: 'POST',
        path: '/prices/history/candles/update',
        body: {
            "_id":"testaddr1-1m-latest",
            "price": {
                "low":0,
                "timestamp":123456789
            },
            "pool_interval": "testaddr1-1m"
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