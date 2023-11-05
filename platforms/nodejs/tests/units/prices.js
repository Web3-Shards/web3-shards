const { Period } = require("../../src/defs");

module.exports = [
    {
        testName: 'Get Native Price',
        purpose: 'it should return the price of a native token',
        function: 'prices.getNativePrice',
        args: [],
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
        function: 'prices.getNativePriceAtTime',
        args: [ 1688912041 ],
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'timestamp',
                    value: 1688911200
                },
                {
                    key: 'price',
                    value: 1866.49
                }
            ]
        }
    },
    {
        testName: 'Get All Native Prices',
        purpose: 'it should return the price of all native tokens',
        function: 'prices.getAllNativePrices',
        args: [],
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
        testName: 'Get Native Price In Time Range',
        purpose: 'it should return the historical price points within a time range',
        function: 'prices.getNativePriceLines',
        args: [ 1642387452, 1643979452 ],
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
        testName: 'Get Pool Price',
        purpose: 'it should return the price of a pool',
        function: 'prices.getPoolPrice',
        args: [ '0xefb47fcfcad4f96c83d4ca676842fb03ef20a477' ],
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
        function: 'prices.getLatestPoolPriceCandle',
        args: [ '0xefb47fcfcad4f96c83d4ca676842fb03ef20a477', Period.dataValue(Period.MINUTE_1) ],
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
        function: 'prices.getPoolPriceAtTime',
        args: [ '0xefb47fcfcad4f96c83d4ca676842fb03ef20a477', 1688915290 ],
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
        function: 'prices.getPoolPriceLines',
        args: [ '0xefb47fcfcad4f96c83d4ca676842fb03ef20a477', 1688786250, 1688886250, Period.dataValue(Period.HOUR_1) ],
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
        function: 'prices.getPoolPriceCandles',
        args: [ '0xefb47fcfcad4f96c83d4ca676842fb03ef20a477', 1688786250, 1688886250, Period.dataValue(Period.HOUR_1) ],
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
        testName: 'Get Batched Prices by Pool Address',
        purpose: 'it should return a 200',
        function: 'prices.getBatchedPoolPrices',
        args: [ [
            "0x1035487ca79068f6617ae75ed3c844ce2d8a0c2a",
            "0x2d0ba902badaa82592f0e1c04c71d66cea21d921"
        ] ],
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'prices.length',
                    value: 2
                }
            ]
        }
    },
]