/*

Copyright (c) 2023, Coinmerge Technologies INC
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree.

*/

"use strict";

const ShardsLib = require("./lib");

class BlockLib extends ShardsLib {
    constructor(_chain, _url) {
        super(_chain, _url);
    }

    /**
     * Get the latest block
     * @returns 
     */
    async getLatestBlock() {
        return await this._get(`blocks/latest?chain=${this._chain}`);
    }

    async getBlockAtTimestamp(_timestamp) {
        return await this._get(`blocks/time?chain=${this._chain}&timestamp=${_timestamp}`);
    }

    async getBlock(_block) {
        return await this._get(`blocks/block?chain=${this._chain}&number=${_block}`);
    }

    async getBlocksInBlockRange(_from, _to) {
        return await this._get(`blocks/block-range?chain=${this._chain}&startblock=${_from}&endblock=${_to}`);
    }

    async getBlocksInTimeRange(_from, _to) {
        return await this._get(`blocks/time-range?chain=${this._chain}&starttime=${_from}&endtime=${_to}`);
    }

    async getBlocks(_blocks) {
        return await this._get(`blocks?chain=${this._chain}`, 'POST', {blocks:_blocks});
    }
}

module.exports = BlockLib;