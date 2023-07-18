const Policies = require('../../src/policies');
module.exports = [
    {
        testName: 'Get All Projects',
        purpose: 'it should return all projects with a pagination token',
        method: 'GET',
        path: '/projects?page=1&chain=eth',
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
        method: 'GET',
        path: '/projects/active?page=1&chain=eth',
        expected: {
            $match: [
                {
                    key: 'projects',
                    $foreach: _el=>{
                        if (_el.chain != 'eth') return false;
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
        method: 'GET',
        path: '/projects/stale?page=1&chain=eth',
        expected: {
            $match: [
                {
                    key: 'projects',
                    $foreach: _el=>{
                        if (_el.chain != 'eth') return false;
                        if (!_el.lastTradeTime) return false;
                        const _diff = parseInt(Date.now()/1000) - _el.lastTradeTime;
                        return _diff > Policies.TOKEN_STATE.STALE && _diff <= Policies.TOKEN_STATE.DEAD;
                    }
                }
            ]
        }
    },
    {
        testName: 'Get Dead Projects',
        purpose: 'it should only return dead projects',
        method: 'GET',
        path: '/projects/dead?page=1&chain=eth',
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
        method: 'GET',
        path: '/projects/search?chain=eth&query=0x9cbfa55cc44dd9d65e735462e4edc8e8158b6567',
        expected: {
            $match: [
                {
                    key: 'projects.0.pool_address',
                    value: '0x9cbfa55cc44dd9d65e735462e4edc8e8158b6567'
                }
            ]
        }
    },
    {
        testName: 'Get Project by Token Address',
        purpose: 'it should return an array of projects that belong to the token',
        method: 'GET',
        path: '/projects/search?chain=eth&query=0x9cbfa55cc44dd9d65e735462e4edc8e8158b6567',
        expected: {
            $match: [
                {
                    key: 'projects.0.pool_address',
                    value: '0x9cbfa55cc44dd9d65e735462e4edc8e8158b6567'
                }
            ]
        }
    },
    {
        testName: 'Get Project by Token Name',
        purpose: 'it should return an array of projects that use to the token name',
        method: 'GET',
        path: '/projects/search?chain=eth&query=rip',
        expected: {
            $match: [
                {
                    key: 'projects.1.price_live',
                    value: 0
                }
            ]
        }
    },
    {
        testName: 'Get Nonexistent Project',
        purpose: 'it should return a 204',
        method: 'GET',
        path: '/projects/search?chain=eth&query=.',
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
        testName: 'Get Backfill Projects',
        purpose: 'it should return projects that need to be backfilled',
        method: 'GET',
        path: '/projects/backfill?chain=eth',
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
        testName: 'Insert Projects',
        purpose: 'it should insert new projects',
        method: 'PUT',
        path: '/projects/insert',
        body: {
            projects: [
                {
                    "pool_address": "testpool1",
                    "address": "testaddr1",
                    "chain": "eth",
                    "name": "testname",
                    "symbol": "testsymbol",
                    "decimals": "18",
                    "lastScannedBlock": 17412257,
                    "base": {
                        "name": "Wrapped Ether",
                        "symbol": "WETH",
                        "decimals": "18",
                        "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
                    },
                    "pairSymbol": "testsymbol/WETH",
                    "token0": "testtoken0"
                },
                {
                    "pool_address": "testpool2",
                    "address": "testaddr2",
                    "chain": "eth",
                    "name": "testname",
                    "symbol": "testsymbol",
                    "decimals": "18",
                    "lastScannedBlock": 17412257,
                    "base": {
                        "name": "Wrapped Ether",
                        "symbol": "WETH",
                        "decimals": "18",
                        "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
                    },
                    "pairSymbol": "testsymbol/WETH",
                    "token0": "testtoken0"
                }
            ]
        },
        expected: {
            duplicate: true
        }
    },
    {
        testName: 'Update Project',
        purpose: 'it should update a project',
        method: 'POST',
        path: '/projects/update',
        body: {
            project: {
                "pool_address": "testpool1",
                "address": "testaddr1",
                "chain": "eth",
                "name": "testname",
                "symbol": "testsymbol",
                "decimals": "18",
                "lastScannedBlock": 17412257,
                "base": {
                    "name": "Wrapped Ether",
                    "symbol": "WETH",
                    "decimals": "18",
                    "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
                },
                "pairSymbol": "testsymbol/WETH"
            }
        },
        expected: {
            statusCode: 200
        }
    }
]