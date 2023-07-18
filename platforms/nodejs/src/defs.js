/*

Copyright (c) 2023, Coinmerge Technologies INC
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree.

*/
'use strict';

const SVC_URL = "https://api.web3shards.io/";
const SVC_VERSIONS = {
    V1: 'v1'
};
const EVM = {
    Ethereum: "eth",
    BinanceSmartChain: "bsc",
    // Arbitrum: 0x00010,
    // Polygon: 0x00011,
    // Avalanche: 0x00100,
    // Optimism: 0x00101,
    // Gnosis: 0x00110,
    // Shibarium: 0x00111
}

module.exports = {
    SVC_URL,
    SVC_VERSIONS,
    EVM
}