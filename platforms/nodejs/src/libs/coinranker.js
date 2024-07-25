/*

Copyright (c) 2023, Coinmerge Technologies INC
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree.

*/

"use strict";

const ShardsLib = require("./lib");

class CoinRankerLib extends ShardsLib {
    constructor(_chain, _url) {
        super(_chain, _url);
    }

    async getTrendingList() {
        return await this._get(`coinranker/list/trending?chain=${this._chain}`);
    }

    async getRecentDipperList() {
        return await this._get(`coinranker/list/recent-dippers?chain=${this._chain}`);
    }

    async getHighVolumeList() {
        return await this._get(`coinranker/list/high-volume?chain=${this._chain}`);
    }

    async getHighLiquidityList() {
        return await this._get(`coinranker/list/high-liquidity?chain=${this._chain}`);
    }

    async getHighLifetimeReturnList() {
        return await this._get(`coinranker/list/high-lifetime-return?chain=${this._chain}`);
    }

}

module.exports = CoinRankerLib;