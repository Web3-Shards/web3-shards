/*

Copyright (c) 2023, Coinmerge Technologies INC
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree.

*/

"use strict";

const ShardsLib = require("./lib");

class TransactionLib extends ShardsLib {
    constructor(_url) {
        super(_url);
    }
    
    /**
     * Returns a paginated response of DEX trades associated with a pool address
     * @param {address} _pool 
     * @param {int} _page if response.nextPage is not null, use this to get the next set of data
     */
    async getTradesOnPool(_pool, _page=1) {
        return await this._get(`txns/trades/pool?address=${_pool}&page=${_page}`);
    }
    
    /**
     * Returns a paginated response of DEX trades associated with a token address
     * @param {address} _token 
     * @param {int} _page if response.nextPage is not null, use this to get the next set of data
     */
    async getTradesOnToken(_token, _page=1) {
        return await this._get(`txns/trades/token?address=${_token}&page=${_page}`);
    }
}

module.exports = TransactionLib;