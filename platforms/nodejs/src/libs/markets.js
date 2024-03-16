/*

Copyright (c) 2023, Coinmerge Technologies INC
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree.

*/

"use strict";

const ShardsLib = require("./lib");

class MarketLib extends ShardsLib {
    constructor(_chain, _url) {
        super(_chain, _url);
    }

    /**
     * Get market statistics during a period of time
     * @param {int} _startTime unix timestamp seconds
     * @param {int} _endTime unix timestamp seconds
     * @param {int} _page 
     * @returns a paginated list of market stats
     */
    async getMarketStats(_startTime, _endTime, _page=1) {
        return await this._get(`market/stats?chain=${this._chain}&interval=15m&startTime=${_startTime}&endTime=${_endTime}&page=${_page}`);
    }

}

module.exports = MarketLib;