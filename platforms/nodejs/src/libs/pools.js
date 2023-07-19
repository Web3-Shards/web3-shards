/*

Copyright (c) 2023, Coinmerge Technologies INC
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree.

*/

"use strict";

const ShardsLib = require("./lib");

class PoolLib extends ShardsLib {
    constructor(_chain, _url) {
        super(_chain, _url);
    }
    
    async getPoolWithPoolAddress(_address) {
        return await this._get(`pools/search?chain=${this._chain}&query=${_address}`);
    }

    async getPoolWithTokenAddress(_address) {
        return await this._get(`pools/search?chain=${this._chain}&query=${_address}`);
    }

    async searchToken(_query) {
        return await this._get(`pools/search?chain=${this._chain}&query=${_query}`);
    }

}

module.exports = PoolLib;