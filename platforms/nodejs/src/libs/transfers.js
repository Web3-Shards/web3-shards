/*

Copyright (c) 2023, Coinmerge Technologies INC
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree.

*/

"use strict";

const ShardsLib = require("./lib");

class TransferLib extends ShardsLib {
    constructor(_chain, _url) {
        super(_chain, _url);
    }

    /**
     * Get transfer history on a given token
     * @param {address} _token 
     * @param {TokenType} _type 
     * @param {int} _page 
     * @returns a paginated list of transfers
     */
    async getTransfersOnToken(_token, _type, _page=1) {
        return await this._get(`transfers?chain=${this._chain}&type=${_type}&token=${_token}&page=${_page}`);
    }

    /**
     * Get transfer history on a given wallet
     * @param {address} _wallet 
     * @param {TokenType} _type 
     * @param {int} _page 
     * @returns a paginated list of transfers
     */
    async getTransfersOnWallet(_wallet, _type, _page=1) {
        return await this._get(`transfers?chain=${this._chain}&type=${_type}&wallet=${_wallet}&page=${_page}`);
    }

    /**
     * Get transfer history for a specific token on a given wallet
     * @param {address} _token 
     * @param {address} _wallet 
     * @param {TokenType} _type 
     * @param {int} _page 
     * @returns a paginated list of transfers
     */
    async getTransfersOnWalletForToken(_wallet, _token, _type, _page=1) {
        return await this._get(`transfers?chain=${this._chain}&type=${_type}&token=${_token}&wallet=${_wallet}&page=${_page}`);
    }
}

module.exports = TransferLib;