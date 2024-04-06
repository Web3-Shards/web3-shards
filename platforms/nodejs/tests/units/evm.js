module.exports = [
    {
        testName: 'Get Native Balance',
        purpose: 'it should return a native balance for a given wallet address',
        function: 'evm.getNativeBalance',
        args: [ '0x0000' ],
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 500
                },
                {
                    key: 'reason',
                    value: 'invalid address'
                }
            ]
        }
    },
]