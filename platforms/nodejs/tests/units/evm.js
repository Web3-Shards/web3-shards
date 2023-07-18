module.exports = [
    {
        testName: 'Get Native Balance',
        purpose: 'it should return a native balance for a given wallet address',
        method: 'GET',
        path: '/evm/balance/native?chain=eth&address=0x000',
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