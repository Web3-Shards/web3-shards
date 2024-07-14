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
    Shibarium: "shibarium",
    Base: "base",
    Polygon: "polygon",
    // Arbitrum: 0x00010,
    // Polygon: 0x00011,
    // Avalanche: 0x00100,
    // Optimism: 0x00101,
    // Gnosis: 0x00110,
}
const NetMsg = {
    Connect: 'connect',
    Disconnect: 'disconnect',
    Handshake: 'handshake',
    Error: 'error',
    NewBlockHeaders: 'newBlockHeaders',
    Logs: 'logs',
    FilteredTrades: 'filteredTrades',
    FilteredPairs: 'filteredPairs',
    PriceAlerts: 'priceAlerts'
};
const TokenType = {
    ERC20: "erc20"
}
const Period = {
    MINUTE_1: 'MINUTE_1',
    MINUTE_3: 'MINUTE_3',
    MINUTE_5: 'MINUTE_5',
    MINUTE_15: 'MINUTE_15',
    MINUTE_30: 'MINUTE_30',
    HOUR_1: 'HOUR_1',
    HOUR_2: 'HOUR_2',
    HOUR_4: 'HOUR_4',
    HOUR_12: 'HOUR_12',
    DAY_1: 'DAY_1',
    DAY_3: 'DAY_3',
    WEEK_1: 'WEEK_1',
    MONTH_1: 'MONTH_1',
    MONTH_3: 'MONTH_3',
    fromSecondValue: _period => {
        switch (_period) {
            case 60: return Period.MINUTE_1;
            case 60*3: return Period.MINUTE_3;
            case 60*5: return Period.MINUTE_5;
            case 60*15: return Period.MINUTE_15;
            case 60*30: return Period.MINUTE_30;
            case 60*60: return Period.HOUR_1;
            case 60*60*2: return Period.HOUR_2;
            case 60*60*4: return Period.HOUR_4;
            case 60*60*12: return Period.HOUR_12;
            case 86400: return Period.DAY_1;
            case 86400*3: return Period.DAY_3;
            case 86400*7: return Period.WEEK_1;
            case 86400*30: return Period.MONTH_1;
            case 86400*90: return Period.MONTH_3;
        }
    },
    fromDataValue: _period => {
        switch (_period) {
            case '1m': return Period.MINUTE_1;
            case '3m': return Period.MINUTE_3;
            case '5m': return Period.MINUTE_5;
            case '15m': return Period.MINUTE_15;
            case '30m': return Period.MINUTE_30;
            case '1h': return Period.HOUR_1;
            case '2h': return Period.HOUR_2;
            case '4h': return Period.HOUR_4;
            case '12h': return Period.HOUR_12;
            case '1d': return Period.DAY_1;
            case '3d': return Period.DAY_3;
            case '1w': return Period.WEEK_1;
            case '1mo': return Period.MONTH_1;
            case '3mo': return Period.MONTH_3;
        }
    },
    dataValue: _period => {
        switch (_period) {
            case Period.MINUTE_1: return '1m';
            case Period.MINUTE_3: return '3m';
            case Period.MINUTE_5: return '5m';
            case Period.MINUTE_15: return '15m';
            case Period.MINUTE_30: return '30m';
            case Period.HOUR_1: return '1h';
            case Period.HOUR_2: return '2h';
            case Period.HOUR_4: return '4h';
            case Period.HOUR_12: return '12h';
            case Period.DAY_1: return '1d';
            case Period.DAY_3: return '3d';
            case Period.WEEK_1: return '1w';
            case Period.MONTH_1: return '1mo';
            case Period.MONTH_3: return '3mo';
        }
    },
    label: _period => {
        switch (_period) {
            case Period.MINUTE_1: return '1 minute';
            case Period.MINUTE_3: return '3 minutes';
            case Period.MINUTE_5: return '5 minutes';
            case Period.MINUTE_15: return '15 minutes';
            case Period.MINUTE_30: return '30 minutes';
            case Period.HOUR_1: return '1 hour';
            case Period.HOUR_2: return '2 hours';
            case Period.HOUR_4: return '4 hours';
            case Period.HOUR_12: return '12 hours';
            case Period.DAY_1: return '1 day';
            case Period.DAY_3: return '3 days';
            case Period.WEEK_1: return '1 week';
            case Period.MONTH_1: return '1 month';
            case Period.MONTH_3: return '3 month';
        }
    },
    shortLabel: _period => {
        switch (_period) {
            case Period.MINUTE_1: return '1 min';
            case Period.MINUTE_3: return '3 min';
            case Period.MINUTE_5: return '5 min';
            case Period.MINUTE_15: return '15 min';
            case Period.MINUTE_30: return '30 min';
            case Period.HOUR_1: return '1 hr';
            case Period.HOUR_2: return '2 hr';
            case Period.HOUR_4: return '4 hr';
            case Period.HOUR_12: return '12 hr';
            case Period.DAY_1: return '1 day';
            case Period.DAY_3: return '3 day';
            case Period.WEEK_1: return '1 wk';
            case Period.MONTH_1: return '1 mo';
            case Period.MONTH_3: return '3 mo';
        }
    },
    seconds: _period => {
        switch (_period) {
            case Period.MINUTE_1: return 60;
            case Period.MINUTE_3: return 60*3;
            case Period.MINUTE_5: return 60*5;
            case Period.MINUTE_15: return 60*15;
            case Period.MINUTE_30: return 60*30;
            case Period.HOUR_1: return 60*60;
            case Period.HOUR_2: return 60*60*2;
            case Period.HOUR_4: return 60*60*4;
            case Period.HOUR_12: return 60*60*12;
            case Period.DAY_1: return 60*60*24;
            case Period.DAY_3: return 60*60*24*3;
            case Period.WEEK_1: return 60*60*24*7;
            case Period.MONTH_1: return 60*60*24*30;
            case Period.MONTH_3: return 60*60*24*30*3;
        }
    },
    keys: [
        'MINUTE_1',
        'MINUTE_3',
        'MINUTE_5',
        'MINUTE_15',
        'MINUTE_30',
        'HOUR_1',
        'HOUR_2',
        'HOUR_4',
        'HOUR_12',
        'DAY_1',
        'DAY_3',
        'WEEK_1',
        'MONTH_1',
        'MONTH_3'
    ]
}

module.exports = {
    SVC_URL,
    SVC_VERSIONS,
    EVM,
    NetMsg,
    Period,
    TokenType
}