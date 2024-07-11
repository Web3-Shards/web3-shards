/*

Copyright (c) 2023, Coinmerge Technologies INC
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree.

*/

"use strict";

const ShardsLib = require("./lib");

class HolderLib extends ShardsLib {
    constructor(_chain, _url) {
        super(_chain, _url);
    }

    /**
     * Get the latest holder count for a token
     * @param {address} _token 
     * @param {TokenType} _type 
     * @returns a holder count
     */
    async getHolderCount(_token, _type) {
        return await this._get(`holders/count?chain=${this._chain}&type=${_type}&token=${_token}`);
    }

    /**
     * Get the latest holder count for a token across all supported chains
     * @param {address} _token 
     * @param {TokenType} _type 
     * @returns holder counts by chain
     */
    async getHolderCount(_token, _type) {
        return await this._get(`holders/count/cross-chain?type=${_type}&token=${_token}`);
    }

    /**
     * Get active holders for a token ranked by balance
     * @param {address} _token 
     * @param {TokenType} _type 
     * @param {int} _page 
     * @returns a paginated list of holders
     */
    async getHolderList(_token, _type, _page=1) {
        return await this._get(`holders?chain=${this._chain}&type=${_type}&token=${_token}&page=${_page}`);
    }

}

module.exports = HolderLib;