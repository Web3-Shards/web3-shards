
const ShardsClient = require("../");
const shards = ShardsClient.API.Ethereum.V1;
shards.configure({
    apiKey: "4d5ac613-474f-4c73-8be0-6122093a065c",
    maxRequestsPerSecond:-1,
    logger: 1
});
const results = {
    pass:0,
    fail:0,
    messages: {}
}

const isObject = function(_in) {
    try {
        JSON.stringify(_in);
        return true;
    } catch (_err) {
        return false;
    }
}

const fail = function(_mock, _because) {
    results.fail++;
    return `❌ \x1b[31m${_mock.testName} failed\x1b[0m ${_mock.purpose}
|    > ${_because.reason}:
|        > \x1b[34m(${_because.detail})\x1b[0m
|`;
}

const pass = function(_mock, _execTime) {
    results.pass++;
    return `✅ \x1b[32m${_mock.testName}\x1b[0m 🕒 ${parseFloat((_execTime/1000).toFixed(2)).toLocaleString()}s`;
}

const allPass = function() {
    return results.pass == results.total;
}

const testMock = async function(_mock, _class) {
    if (!results.messages[_class]) {
        results.messages[_class] = [];
    }
    
    console.log(`\x1b[37mtesting ${_mock.function}\x1b[0m`)
    const _start = Date.now();

    const _funcParts = _mock.function.split('.');
    let _resp;
    for (var i in _funcParts) {
        if (i == _funcParts.length - 1) {
            _resp = await _resp[_funcParts[i]](..._mock.args);
        } else if (i == 0) {
            _resp = shards[_funcParts[i]];
        } else {
            _resp = _resp[_funcParts[i]];
        }
    }
    
    const _dt = Date.now()-_start;

    // console.log(_resp)

    for (const key of Object.keys(_mock.expected)) {

        // is this a nested comparison?
        if (key == '$match') {
            for (const _match of _mock.expected[key]) {
                const _keyPath = _match.key.split('.');
                let _actual = _resp;
                for (const _step of _keyPath) {
                    _actual = _actual[_step];
                    if (!_actual) break;
                }

                if (_match.value != undefined && _match.value != null) {
                    if (_match.value == '$notnull') {
                        if (!_actual) {
                            results.messages[_class].push(fail(_mock, {
                                reason: `The expected key (${_match.key}) value was expected to be not null`,
                                detail: `${_match.key} is null`
                            }));
                            return;
                        }
                        continue;
                    }

                    if (_match.value == 'null') _match.value = null;
                    let _expected = _match.value;
                    
                    if (!isNaN(_expected?.$gt)) {
                        if (Number(_actual) <= Number(_expected.$gt)) {
                            results.messages[_class].push(fail(_mock, {
                                reason: `The expected key (${_match.key}) value did not satisfy the response value`,
                                detail: `${_expected.$gt} >= ${_actual}`
                            }));
                            return;
                        }
                        continue;
                    }

                    if (_expected != _actual) {
                        results.messages[_class].push(fail(_mock, {
                            reason: `The expected key (${_match.key}) value did not match the response value`,
                            detail: `${_expected} != ${_actual}`
                        }));
                        return;
                    }
                } else if (_match.$foreach) {
                    for (const a of _actual) {
                        if (!_match.$foreach(a)) {
                            results.messages[_class].push(fail(_mock, {
                                reason: `One or more elements in the response array (${_match.key}) failed validation`,
                                detail: `${_match.$foreach}`
                            }));
                            break;
                        }
                    }
                } else {
                    results.messages[_class].push(fail(_mock, {
                        reason: `Missing in test: no expected value was declared for key`,
                        detail: _match.key
                    }));
                }
            }
            continue;
        }

        const _isObject = isObject(_mock.expected[key]);
        const _expected = _isObject ? JSON.stringify(_mock.expected[key]) : _mock.expected[key];

        if (!_resp[key]) {
            results.messages[_class].push(fail(_mock, {
                reason: 'The expected key value did not exist in the response value',
                detail: key
            }));
            return;
        }

        const _actual = _isObject ? JSON.stringify(_resp[key]) : _resp[key];

        if (_expected != _actual) {
            results.messages[_class].push(fail(_mock, {
                reason: `The expected key (${key}) value did not match the response value`,
                detail: `${_expected} != ${_actual}`
            }));
            return;
        }
    }
    results.messages[_class].push(pass(_mock, _dt));
    return;
}

const wait = async function(_ms) {
    return new Promise((_res,_rej)=>{setTimeout(() => {
        _res();
    }, _ms);})
}

const run = async function() {
    let _tests = [];

    const units = require(`./units`);
    const _unitKeys = Object.keys(units);
    for (let _unit of _unitKeys) {
        for (let _mock of units[_unit]) {
            await wait(250)
            const _t = async function() { return await testMock(_mock, _unit); }
            _tests.push(_t());
        }
    }

    await Promise.all(_tests);

    results.total = results.pass + results.fail;

    for (const c of Object.keys(results.messages)) {
        console.log(`\x1b[35;1m${c} Tests\x1b[0m`);
        for (const m of results.messages[c]) {
            console.log(m);
        }
    }

    if (allPass()) {
        console.log(`\x1b[34;1mAll Tests Passed! \x1b[0m(\x1b[32m${results.pass}\x1b[0m/\x1b[31m${results.fail}\x1b[0m/${results.total})`);
    } else {
        console.log(`\x1b[31;1mSome Tests Failed \x1b[0m(\x1b[32m${results.pass}\x1b[0m/\x1b[31m${results.fail}\x1b[0m/${results.total})`);
    }

    return;
}

run();