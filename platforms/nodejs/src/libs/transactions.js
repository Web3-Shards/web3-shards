/*

Copyright (c) 2023, Coinmerge Technologies INC
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree.

*/

"use strict";

const ShardsLib = require("./lib");

class TransactionLib extends ShardsLib {
    constructor(_chain, _url) {
        super(_chain, _url);
    }
    
    /**
     * Returns a paginated response of DEX trades associated with a pool address
     * @param {address} _pool 
     * @param {int} _page if response.nextPage is not null, use this to get the next set of data
     */
    async getTradesOnPool(_pool, _page=1, _origin=null, _starttime=null, _endtime=null) {
        let _url = `txns/trades/pool?address=${_pool}&page=${_page}`;
        if (_origin)
            _url += `&origin=${_origin}`;
        if (_starttime)
            _url += `&starttime=${_starttime}`;
        if (_endtime)
            _url += `&endtime=${_endtime}`;
        return await this._get(_url);
    }
    
    /**
     * Returns a paginated response of DEX trades associated with a token address
     * @param {address} _token 
     * @param {int} _page if response.nextPage is not null, use this to get the next set of data
     */
    async getTradesOnToken(_token, _page=1, _origin=null, _starttime=null, _endtime=null) {
        let _url = `txns/trades/token?address=${_token}&page=${_page}`;
        if (_origin)
            _url += `&origin=${_origin}`;
        if (_starttime)
            _url += `&starttime=${_starttime}`;
        if (_endtime)
            _url += `&endtime=${_endtime}`;
        return await this._get(_url);
    }
}

module.exports = TransactionLib;