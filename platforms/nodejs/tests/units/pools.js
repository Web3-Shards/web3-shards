
module.exports = [
    {
        testName: 'Get Pool With Pool Address',
        purpose: 'it should return a pool using a pool address',
        function: 'pools.getPoolWithPoolAddress',
        args: [ '0x9d3b477880d931988cc1edf859846339bcc909b3' ],
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
        testName: 'Get Pool With Token Address',
        purpose: 'it should return a pool using a token address, including an array of pools',
        function: 'pools.getPoolWithTokenAddress',
        args: [ '0x9813037ee2218799597d83d4a5b6f3b6778218d9' ],
        expected: { 
            $match: [
                {
                    key: 'pools.0.address',
                    value: '0x9813037ee2218799597d83d4a5b6f3b6778218d9'
                }
            ]
        }
    },
    {
        testName: 'Get Pool With Token Name',
        purpose: 'it should return an array of pools using a token name, each including an array of pools',
        function: 'pools.searchToken',
        args: [ 'bone shibaswap' ],
        expected: { 
            $match: [
                {
                    key: 'pools',
                    $foreach: pool=>pool.pool_address != null
                }
            ]
        }
    },
    {
        testName: 'Get Pool With Token Symbol',
        purpose: 'it should return an array of pools using a token symbol, each including an array of pools',
        function: 'pools.searchToken',
        args: [ 'bone' ],
        expected: { 
            $match: [
                {
                    key: 'pools',
                    $foreach: pool=>pool.pool_address != null
                }
            ]
        }
    },
]