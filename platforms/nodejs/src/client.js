/*

Copyright (c) 2023, Coinmerge Technologies INC
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree.

*/

"use strict";

const { EVM, SVC_URL, SVC_VERSIONS } = require("./defs");
const { BlockLib, ProjectLib, TransactionLib, EVMLib, PriceLib, BalanceLib, TransferLib, HolderLib, MarketLib, CoinRankerLib } = require("./libs");

const requireNumber = function(_obj, _field, _default) {
    if (!_obj[_field])
        _obj[_field] = _default;
    if (isNaN(_obj[_field]))
        _obj[_field] = _default;
    return _obj;
}

class ShardsClient {
    constructor(_chain, _version) {
        this._chain = _chain;
        this._url = `${SVC_URL}${_version}/`;
        this.blocks = new BlockLib(this._chain, this._url);
        this.projects = new ProjectLib(this._chain, this._url);
        this.transactions = new TransactionLib(this._chain, this._url);
        this.evm = new EVMLib(this._chain, this._url);
        this.prices = new PriceLib(this._chain, this._url);
        this.balances = new BalanceLib(this._chain, this._url);
        this.transfers = new TransferLib(this._chain, this._url);
        this.holders = new HolderLib(this._chain, this._url);
        this.market = new MarketLib(this._chain, this._url);
        this.coinranker = new CoinRankerLib(this._chain, this._url);
    }

    /**
     * Configure the web3-shards client with your preferred settings:
     *  - apiKey: Your api key
     *  - maxRequestsPerSecond: Default is 10. Helps prevent accidentally exceeding your allowance. Set to -1 for "unlimited".
     *  - logger: Default is 1. 0=none,1=errors,2=verbose
     * @param {Object} _config 
     */
    configure(_config) {
        if (!_config)
            return;
        _config = requireNumber(_config, "maxRequestsPerSecond", 10);
        _config = requireNumber(_config, "logger", 1);
        this.blocks.configure(this, _config);
        this.projects.configure(this, _config);
        this.transactions.configure(this, _config);
        this.evm.configure(this, _config);
        this.prices.configure(this, _config);
        this.balances.configure(this, _config);
        this.transfers.configure(this, _config);
        this.holders.configure(this, _config);
        this.market.configure(this, _config);
        this.coinranker.configure(this, _config);
    }
}

module.exports = {
    Ethereum: {
        V1: new ShardsClient(EVM.Ethereum, SVC_VERSIONS.V1)
    },
    BSC: {
        V1: new ShardsClient(EVM.BinanceSmartChain, SVC_VERSIONS.V1)
    },
    SHIBARIUM: {
        V1: new ShardsClient(EVM.Shibarium, SVC_VERSIONS.V1)
    },
    BASE: {
        V1: new ShardsClient(EVM.Base, SVC_VERSIONS.V1)
    },
    POLYGON: {
        V1: new ShardsClient(EVM.Polygon, SVC_VERSIONS.V1)
    },
    SOLANA: {
        V1: new ShardsClient(EVM.Solana, SVC_VERSIONS.V1)
    },
    XRP: {
        V1: new ShardsClient(EVM.XRP, SVC_VERSIONS.V1)
    },
};