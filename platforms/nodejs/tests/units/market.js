module.exports = [
    {
        testName: 'Get Market Stats',
        purpose: 'it should return a list of market statistics',
        function: 'market.getMarketStats',
        args: [
            1710474300,
            1710774300
        ],
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'marketStats.length',
                    value: 50
                },
                {
                    key: 'pageSize',
                    value: 50
                },
                {
                    key: 'nextPage',
                    value: 2
                },
                {
                    key: 'marketStats',
                    $foreach: t=>{
                        return t.chain != null &&
                                  t.interval != null &&
                                  t.makers != null &&
                                  t.swaps != null &&
                                  t.volume != null &&
                                  t.timestamp != null;
                    }
                }
            ]
        }
    }
]