/*

Copyright (c) 2023, Coinmerge Technologies INC
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree.

*/

"use strict";

const ShardsLib = require("./lib");

class ProjectLib extends ShardsLib {
    constructor(_chain, _url) {
        super(_chain, _url);
    }
    
    async getAllProjects(_page=1) {
        return await this._get(`projects?chain=${this._chain}&page=${_page}`);
    }

    async getActiveProjects(_page=1) {
        return await this._get(`projects/active?chain=${this._chain}&page=${_page}`);
    }

    async getStaleProjects(_page=1) {
        return await this._get(`projects/stale?chain=${this._chain}&page=${_page}`);
    }

    async getDeadProjects(_page=1) {
        return await this._get(`projects/dead?chain=${this._chain}&page=${_page}`);
    }

    async getTrendingProjects(_period, _volume, _priceChange, _tradeCount, _trueValue) {
        return await this._get(`projects/trending?period=${_period}&volume=${_volume}&priceChange=${_priceChange}&tradeCount=${_tradeCount}&trueValue=${_trueValue}`);
    }

    async getProjectWithPoolAddress(_address) {
        return await this._get(`projects/search?chain=${this._chain}&query=${_address}`);
    }

    async getProjectWithTokenAddress(_address) {
        return await this._get(`projects/search?chain=${this._chain}&query=${_address}`);
    }

    async searchProject(_query) {
        return await this._get(`projects/search?chain=${this._chain}&query=${_query}`);
    }
}

module.exports = ProjectLib;