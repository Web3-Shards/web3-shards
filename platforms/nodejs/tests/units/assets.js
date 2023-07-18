module.exports = [
    {
        testName: 'Get Token Balances',
        purpose: 'it should get a list of tokens with relevant balances',
        method: 'GET',
        path: '/assets/tokens/balances?address=0xf864e43921d2c19f21756e1eB8f32Ba9B92D6376&chain=eth',
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'records',
                    $foreach: record=>{
                        return record.token != null & record.balance != null;
                    }
                }
            ]
        }
    },
    {
        testName: 'Get Token Transfers',
        purpose: 'it should get a list of token transfers',
        method: 'GET',
        path: '/assets/tokens/transfers',
        query: {
            chain:'eth',
            address: '0xf864e43921d2c19f21756e1eB8f32Ba9B92D6376',
            token: '0xc48b4814faed1ccc885dd6fde62a6474aecbb19a',
        },
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'records',
                    $foreach: record=>{
                        return record.timestamp != null & record.amount != null && record.type != null;
                    }
                }
            ]
        }
    },
    {
        testName: 'Get Transfers',
        purpose: 'it should get a list of transfers',
        method: 'GET',
        path: '/assets/transfers',
        query: {
            chain:'eth',
            address: '0xf864e43921d2c19f21756e1eB8f32Ba9B92D6376'
        },
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'records',
                    $foreach: record=>{
                        return record.amount != null;
                    }
                }
            ]
        }
    },
    {
        testName: 'Get NFTs',
        purpose: 'it should get a list of NFTs',
        method: 'GET',
        path: '/assets/nfts',
        query: {
            chain:'eth',
            address: '0xf864e43921d2c19f21756e1eB8f32Ba9B92D6376'
        },
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
            ]
        }
    }
]