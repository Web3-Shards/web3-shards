module.exports = [
    {
        testName: 'Get Trades On Token',
        purpose: 'it should return trades for a given token',
        function: 'transactions.getTradesOnToken',
        args: ['0xc48b4814faed1ccc885dd6fde62a6474aecbbx19a'],
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
        function: 'transactions.getTradesOnToken',
        args: ['0x185e32f3db8226a8363c31ca0453385f3f8dc126'],
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