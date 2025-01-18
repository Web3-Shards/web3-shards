/*

Copyright (c) 2023, Coinmerge Technologies INC
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree.

*/

"use strict";

const { EVM, Period } = require("../defs");
const ShardsLib = require("./lib");

class PriceLib extends ShardsLib {
    constructor(_chain, _url) {
        super(_chain, _url);
        this._nativeToken = _chain == EVM.Ethereum ? 'eth' : 
                            _chain == EVM.BinanceSmartChain ? 'bnb' : 
                            _chain == EVM.Shibarium ? 'shibarium' :
                            _chain == EVM.Polygon ? 'polygon' :
                            _chain == EVM.Solana ? 'solana' :
                            _chain == EVM.XRP ? 'xrp' : 'eth';
    }
    
    async getNativePrice() {
        return await this._get(`prices/native?token=${this._nativeToken}`);
    }

    async getAllNativePrices() {
        return await this._get(`prices/native?token=*`);
    }

    async getNativePriceAtTime(_timestamp) {
        return await this._get(`prices/history/native?token=${this._nativeToken}&timestamp=${_timestamp}`);
    }

    async getNativePriceLines(_startTime, _endTime, _page=1) {
        return await this._get(`prices/history/lines/native?token=${this._nativeToken}&starttime=${_startTime}&endtime=${_endTime}&page=${_page}`);
    }

    async getPoolPrice(_address) {
        return await this._get(`prices/pool?address=${_address}&chain=${this._chain}`);
    }

    async getLatestPoolPriceCandle(_address, _interval=Period.dataValue(Period.MINUTE_1)) {
        return await this._get(`prices/candles/latest/pool?address=${_address}&interval=${_interval}&chain=${this._chain}`);
    }

    async getPoolPriceAtTime(_address, _timestamp) {
        return await this._get(`prices/history/pool?address=${_address}&timestamp=${_timestamp}&chain=${this._chain}`);
    }

    async getPoolPriceLines(_address, _startTime, _endTime, _interval=Period.dataValue(Period.HOUR_1), _page=1) {
        return await this._get(`prices/history/lines/pool?address=${_address}&starttime=${_startTime}&endtime=${_endTime}&interval=${_interval}&page=${_page}&chain=${this._chain}`);
    }

    async getPoolPriceCandles(_address, _startTime, _endTime, _interval=Period.dataValue(Period.HOUR_1), _page=1) {
        return await this._get(`prices/history/candles/pool?address=${_address}&starttime=${_startTime}&endtime=${_endTime}&interval=${_interval}&page=${_page}&chain=${this._chain}`);
    }

    /**
     * Returns an array of price info from matching _pools
     * @param {string[]} _pools An array of pool addresses
     */
    async getBatchedPoolPrices(_pools) {
        return await this._get(`prices/pool/batch`, 'POST', {pools: _pools})
    }
}

module.exports = PriceLib;