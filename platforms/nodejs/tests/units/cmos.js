module.exports = [
    {
        testName: 'Get Projects',
        purpose: 'it should return all projects',
        method: 'GET',
        path: '/cmos/projects',
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
                {
                    key: 'projects',
                    $foreach: project=>{
                        return project.modifiedDate != null;
                    }
                }
            ]
        }
    },
    {
        testName: 'Get Project With Pool',
        purpose: 'it should return a project from a pool address',
        method: 'GET',
        path: '/cmos/projects/pool?address=0x5b8aef96c421217e02a3464c86499059523ec9a9',
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
            ]
        }
    },
    {
        testName: 'Get Project With Token',
        purpose: 'it should return a project from a token address',
        method: 'GET',
        path: '/cmos/projects/token?address=0x87869A9789291A6cEC99f3c3Ef2fF71fcEb12a8e',
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                },
            ]
        }
    },
    {
        testName: 'Update Project',
        purpose: 'it should update a project using the pool address',
        method: 'POST',
        path: '/cmos/projects/pool/update',
        body: {
            "address": '0x5aa0292336cb835d5dc1e515b6efe00231c03760',
            "prices": {
                "day_1": {
                    "change": 0.32846437185579036,
                    "prettyPrint": "-67.15%"
                },
                "day_3": {
                    "change": 0.256202290352471,
                    "prettyPrint": "-74.38%"
                },
                "hour_1": {
                    "change": 1.046436879875708,
                    "prettyPrint": "+4.64%"
                },
                "month_1": {
                    "change": 0.17986971363375515,
                    "prettyPrint": "-82.01%"
                },
                "month_3": {
                    "change": 0.15931309629840767,
                    "prettyPrint": "-84.07%"
                },
                "week_1": {
                    "change": 0.20735473903082974,
                    "prettyPrint": "-79.26%"
                },
                "week_2": {
                    "change": 0.19048038556330882,
                    "prettyPrint": "-80.95%"
                },
                "live": 0.000029808248989984995
            },
            "fdmc": 121400.5123
        },
        expected: {
            $match: [
                {
                    key: 'statusCode',
                    value: 200
                }
            ]
        }
    }
]