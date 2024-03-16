const Policies = require("./policies");

module.exports = [
    {
        testName: 'Get All Projects',
        purpose: 'it should return all projects with a pagination token',
        function: 'projects.getAllProjects',
        args: [],
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key:'nextPage',
                    value: 2
                },
                {
                    key:'prevPage',
                    value: 'null'
                },
            ]
        }
    },
    {
        testName: 'Get Active Projects',
        purpose: 'it should only return active projects',
        function: 'projects.getActiveProjects',
        args: [],
        expected: {
            $match: [
                {
                    key: 'projects',
                    $foreach: _el=>{
                        if (!_el.lastTradeTime) return false;
                        return parseInt(Date.now()/1000) - _el.lastTradeTime <= Policies.TOKEN_STATE.STALE;
                    }
                }
            ]
        }
    },
    {
        testName: 'Get Stale Projects',
        purpose: 'it should only return stale projects',
        function: 'projects.getStaleProjects',
        args: [],
        expected: {
            $match: [
                {
                    key: 'projects',
                    $foreach: _el=>{
                        if (!_el.lastTradeTime) return false;
                        const _diff = parseInt(Date.now()/1000) - _el.lastTradeTime;
                        return _diff > Policies.TOKEN_STATE.STALE && _diff < Policies.TOKEN_STATE.DEAD;
                    }
                }
            ]
        }
    },
    {
        testName: 'Get Dead Projects',
        purpose: 'it should only return dead projects',
        function: 'projects.getDeadProjects',
        args: [],
        expected: {
            $match: [
                {
                    key: 'projects',
                    $foreach: _el=>{
                        if (_el.chain != 'eth') return false;
                        if (!_el.lastTradeTime) return false;
                        const _diff = parseInt(Date.now()/1000) - _el.lastTradeTime;
                        return _diff > Policies.TOKEN_STATE.DEAD;
                    }
                }
            ]
        }
    },
    {
        testName: 'Get Project by Pool Address',
        purpose: 'it should return a single project',
        function: 'projects.getProjectWithPoolAddress',
        args: [ '0x5764a6f2212d502bc5970f9f129ffcd61e5d7563' ],
        expected: {
            $match: [
                {
                    key: 'projects',
                    $foreach: project=>project.pool_address != null
                }
            ]
        }
    },
    {
        testName: 'Get Project by Token Address',
        purpose: 'it should return an array of projects that belong to the token',
        function: 'projects.getProjectWithTokenAddress',
        args: [ '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce' ],
        expected: {
            $match: [
                {
                    key: 'projects',
                    $foreach: project=>project.pool_address != null
                }
            ]
        }
    },
    {
        testName: 'Get Project by Token Name',
        purpose: 'it should return an array of projects that use to the token name',
        function: 'projects.searchProject',
        args: [ 'rip' ],
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
        testName: 'Get Nonexistent Project',
        purpose: 'it should return a 200',
        function: 'projects.searchProject',
        args: [ '.' ],
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'projects.length',
                    value: 0
                }
            ]
        }
    },
    {
        testName: 'Get Batched Projects by Pool Address',
        purpose: 'it should return a 200',
        function: 'projects.getProjectsBatchedByPools',
        args: [ [
            "0x1035487ca79068f6617ae75ed3c844ce2d8a0c2a",
            "0x2d0ba902badaa82592f0e1c04c71d66cea21d921"
        ] ],
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'projects.length',
                    value: 2
                }
            ]
        }
    },
    {
        testName: 'Get Batched Projects by Token Address',
        purpose: 'it should return a 200',
        function: 'projects.getProjectsBatchedByTokens',
        args: [ [
            "0xbed85cf4c249bd5fc187af600d652dd2beefddea",
            "0x7bef710a5759d197ec0bf621c3df802c2d60d848"
        ] ],
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'projects.length',
                    value: 4
                }
            ]
        }
    },
]