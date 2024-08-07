/*

Copyright (c) 2023, Coinmerge Technologies INC
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree.

*/

"use strict";

const ShardsLib = require("./lib");

class EVMLib extends ShardsLib {
    constructor(_chain, _url) {
        super(_chain, _url);
    }
    
    async getNativeBalance(_address) {
        return await this._get(`evm/balance/native?chain=${this._chain}&address=${_address}`)
    }
}

module.exports = EVMLib;