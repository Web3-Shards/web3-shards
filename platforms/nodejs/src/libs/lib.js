/*

Copyright (c) 2023, Coinmerge Technologies INC
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree.

*/
const fetch = require("node-fetch");

"use strict";

class ShardsLib {
    constructor(_url) {
        this._url = _url;
    }

    configure(_ctl, _config) {
        this._ctl = _ctl;
        this._config = _config;
    }

    async _get(_resource) {
        try {
            if (!this._config) {
                return { error: 'No configuration object found. Use shardsClient.configure(). See https://github.com/Web3-Shards/web3-shards/main/platforms/nodejs/README.md' };
            }
            if (!this._config.apiKey) {
                return { error: 'Missing api-key in request. Use shardsClient.configure(). See https://github.com/Web3-Shards/web3-shards/main/platforms/nodejs/README.md' };
            }
            const _now = Date.now();
            const _dt_allow = (1 / this._config.maxRequestsPerSecond) * 1000;
            if (!this._ctl._lastCallTime)
                this._ctl._lastCallTime = _now;
            else if (_now - this._ctl._lastCallTime < _dt_allow) {
                return { error: `Exceeding max requests per second: ${this._config.maxRequestsPerSecond} or 1 call every ${_dt_allow}ms` }
            }
            this._ctl._lastCallTime = _now;
            const _resp = await fetch(`${this._url}${_resource}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': this._config.apiKey
                },
                referrerPolicy: 'no-referrer'
            });
            const _ret = await _resp.json();
            if (!_ret.statusCode) {
                return { error: `Something went wrong requesting data from ${_resource}` };
            }
            switch (_ret.statusCode) {
                case 200: return _ret;
                case 401: return { error: `Authorization failed when requesting data from ${_resource}. Is your api-key correct? Using ${this._config.apiKey}` };
                case 429: return { error: `Too many requests when requesting data from ${_resource}` };
                default: return { error: `Something went wrong requesting data from ${_resource}` };
            }
        }
        catch (_err) {
            return { error: `Something went wrong requesting data from ${_resource}: ${_err}` };
        }
    }
}

module.exports = ShardsLib;