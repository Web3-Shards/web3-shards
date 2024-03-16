module.exports = [
    {
        testName: 'Get Holder List',
        purpose: 'it should return a list of holders for a given token',
        function: 'holders.getHolderList',
        args: [
            '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
            'erc20'
        ],
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'holders.length',
                    value: { $gt: 0 }
                },
                {
                    key: 'pageSize',
                    value: 100
                },
                {
                    key: 'nextPage',
                    value: 2
                },
                {
                    key: 'holders',
                    $foreach: t=>{
                        return t.holder != null &&
                                  t.balance != null;
                    }
                }
            ]
        }
    },
    {
        testName: 'Get Holder Count',
        purpose: 'it should return the holder count for a given token',
        function: 'holders.getHolderCount',
        args: [
            '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
            'erc20'
        ],
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'holders',
                    value: { $gt: 1 }
                }
            ]
        }
    }
]