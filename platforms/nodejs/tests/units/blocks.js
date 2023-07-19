module.exports = [
    {
        testName: 'Get Block',
        purpose: 'it should return a block using a block number',
        function: 'blocks.getBlock',
        args: [ '14245233' ],
        expected: {
            $match: [
                {
                    key: 'block.block',
                    value: 14245233
                }
            ]
        }
    },
    {
        testName: 'Get Block With Timestamp',
        purpose: 'it should return a block using a timestamp',
        function: 'blocks.getBlockAtTimestamp',
        args: ['1687465017'],
        expected: {
            $match: [
                {
                    key: 'block.block',
                    value: 17537478
                }
            ]
        }
    },
    {
        testName: 'Get Latest Block',
        purpose: 'it should return the latest block',
        function: 'blocks.getLatestBlock',
        args: [],
        expected: {
            $match: [
                {
                    key:'block.block',
                    value: '$notnull'
                },
                {
                    key:'block.chain',
                    value: '$notnull'
                },
                {
                    key:'block.timestamp',
                    value: '$notnull'
                },
                {
                    key:'block.date',
                    value: '$notnull'
                }
            ]
        }
    },
    {
        testName: 'Get Blocks in Block Range',
        purpose: 'it should return an array of blocks given a start and end block',
        function: 'blocks.getBlocksInBlockRange',
        args: [ '14159230', '14159264' ],
        expected: {
            $match: [
                {
                    key: 'blocks',
                    $foreach: b=>{return b.block != null}
                }
            ]
        }
    },
    {
        testName: 'Get Blocks in Time Range',
        purpose: 'it should return an array of blocks given a start and end timestamp',
        function: 'blocks.getBlocksInTimeRange',
        args: [ '1644240971', '1644241350' ],
        expected: {
            $match: [
                {
                    key: 'blocks',
                    $foreach: b=>{return b.block != null}
                }
            ]
        }
    },
    {
        testName: 'Get Specific Blocks',
        purpose: 'it should return an array of blocks given an array of block numbers',
        function: 'blocks.getBlocks',
        args: [ [ 14958849, 14958850 ] ],
        expected: {
            $match: [
                {
                    key: 'blocks.0.block',
                    value: 14958849,
                },
                {
                    key: 'blocks.1.block',
                    value: 14958850
                }
            ]
        }
    }
]