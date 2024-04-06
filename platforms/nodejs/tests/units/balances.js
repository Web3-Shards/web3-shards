const validateHistoricalBalance = b=>{
    return b.block != null &&
              b.token != null &&
              b.holder != null &&
              b.balance != null;
}
const validateBalance = b=>{
    return b.token != null &&
              b.holder != null &&
              b.balance != null;
}
const successIndicators = [
    {
        key: 'statusCode',
        value: 200
    },
    {
        key: 'balances.length',
        value: { $gt: 0 }
    },
    {
        key: 'pageSize',
        value: 100
    },
    {
        key: 'nextPage',
        value: 2
    }
]

module.exports = [
    {
        testName: 'Get Latest Balances On Token',
        purpose: 'it should return the latest balances on a wallet',
        function: 'balances.getLatestBalancesOnWallet',
        args: [
            '0xade7b949f70eafc2c0999fc6b8f18b0ea0382746',
            'erc20'
        ],
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'balances.length',
                    value: { $gt: 0 }
                },
                {
                    key: 'balances',
                    $foreach: validateBalance
                }
            ]
        }
    },
    {
        testName: 'Get Balance History On Token',
        purpose: 'it should return the balance history for a given token',
        function: 'balances.getBalancesOnToken',
        args: [
            '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            'erc20'
        ],
        expected: {
            $match: [
                ...successIndicators,
                {
                    key: 'balances',
                    $foreach: validateHistoricalBalance
                }
            ]
        }
    },
    {
        testName: 'Get Balance History On Wallet',
        purpose: 'it should return the balance history for a given wallet',
        function: 'balances.getBalancesOnWallet',
        args: [
            '0xade7b949f70eafc2c0999fc6b8f18b0ea0382746',
            'erc20'
        ],
        expected: {
            $match: [
                ...successIndicators,
                {
                    key: 'balances',
                    $foreach: validateHistoricalBalance
                }
            ]
        }
    },
    {
        testName: 'Get Balance History On Wallet For Token',
        purpose: 'it should return the balance history on a wallet for a given token',
        function: 'balances.getBalancesOnWalletForToken',
        args: [
            '0xade7b949f70eafc2c0999fc6b8f18b0ea0382746',
            '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            'erc20'
        ],
        expected: {
            $match: [
                ...successIndicators,
                {
                    key: 'balances',
                    $foreach: validateHistoricalBalance
                }
            ]
        }
    },
]