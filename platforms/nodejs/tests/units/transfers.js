const validateTransfer = t=>{
    return t.token != null &&
              t.holder != null &&
              t.balance != null &&
              t.transfer_amt != null;
}

const successIndicators = [
    {
        key: 'statusCode',
        value: 200
    },
    {
        key: 'transfers.length',
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
        testName: 'Get Transfer History On Token',
        purpose: 'it should return the transfer history for a given token',
        function: 'transfers.getTransfersOnToken',
        args: [
            '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            'erc20'
        ],
        expected: {
            $match: [
                ...successIndicators,
                {
                    key: 'transfers',
                    $foreach: validateTransfer
                }
            ]
        }
    },
    {
        testName: 'Get Transfer History On Wallet',
        purpose: 'it should return the transfer history for a given wallet',
        function: 'transfers.getTransfersOnWallet',
        args: [
            '0xade7b949f70eafc2c0999fc6b8f18b0ea0382746',
            'erc20'
        ],
        expected: {
            $match: [
                ...successIndicators,
                {
                    key: 'transfers',
                    $foreach: validateTransfer
                }
            ]
        }
    },
    {
        testName: 'Get Transfer History On Wallet For Token',
        purpose: 'it should return the transfer history on a wallet for a given token',
        function: 'transfers.getTransfersOnWalletForToken',
        args: [
            '0xade7b949f70eafc2c0999fc6b8f18b0ea0382746',
            '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            'erc20'
        ],
        expected: {
            $match: [
                ...successIndicators,
                {
                    key: 'transfers',
                    $foreach: validateTransfer
                }
            ]
        }
    },
]