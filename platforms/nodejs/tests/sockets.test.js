'use strict';

const ShardsSocketClient = require("../src/socketClient");
const {EVM} = require('../src/defs');
const color = {
    nc:`\x1b[0m`,
    red:`\x1b[31m`,
    red_b:`\x1b[31;1m`,
    green:`\x1b[32m`,
    green_b:`\x1b[32;1m`,
    yellow:`\x1b[33m`,
    purple:`\x1b[35m`,
    purple_b:`\x1b[35;1m`,
    purple_bui:`\x1b[35;1m\x1b[35;4m\x1b[35;3m`,
    blue:`\x1b[36m`,
    blue_bold:`\x1b[36;1m`,
    blue_italic:`\x1b[36;3m`,
    blue_underline:`\x1b[36;4m`,
    blue_bu:`\x1b[36;1m\x1b[36;4m`,
    grey_bold:`\x1b[37;1m`,
    grey_italic:`\x1b[37;3m`,
}
const statShape = {
    usdVolume: {
        buy: 0,
        sell: 0
    },
    backingCurrencyVolume: {
        buy: {},
        sell: {}
    },
    avgVolumePerTrade: {
        buy: 0,
        sell: 0
    },
    trades: 0,
    buy: 0,
    sell: 0,
    highTrade: 0,
    lowTrade: 10000000000,
}
const stats = {}
const startTime = Date.now();

const toUSDString = function(num) {
    return num.toLocaleString('en-us', {style:'currency', currency:'USD'});
}

const captureStats = function(chain, volume) {
    const dt = parseInt((Date.now() - startTime) / 1000);

    const calcStats = function(s, v) {
        if (!s)
            s = JSON.parse(JSON.stringify(statShape));
        s.usdVolume[v.type] += v.usd;
        if (!s.backingCurrencyVolume[v.type][v.backingCurrencyType])
            s.backingCurrencyVolume[v.type][v.backingCurrencyType] = {raw:0,usdValue:0};
        s.backingCurrencyVolume[v.type][v.backingCurrencyType].raw += v.backingCurrencyValue;
        s.backingCurrencyVolume[v.type][v.backingCurrencyType].usdValue += v.usd;
        s.trades ++;
        s[v.type] ++;
        if (v.usd > s.highTrade)
            s.highTrade = v.usd;
        if (v.usd < s.lowTrade)
            s.lowTrade = v.usd;
        s.avgVolumePerTrade[v.type] = s.usdVolume[v.type] / s[v.type];
        return s;
    }

    const printStats = function(title, s, tablen=0) {
        if (!s.usdVolume) return "";
        let t = "";
        for (var i = 0; i < tablen; i++) t += "  ";
        let bcVolumeString = `${t}${t}${color.blue_italic}backing currency volume${color.nc}:
${t}${t}${t}buys:`;
        for (const bc of Object.keys(s.backingCurrencyVolume.buy)) {
            const bcVol = s.backingCurrencyVolume.buy[bc];
            bcVolumeString += `
${t}${t}${t}${t}${color.yellow}${bc}${color.nc}: ${bcVol.raw.toFixed(2)} (${toUSDString(bcVol.usdValue)})`;
        }
        bcVolumeString += `
${t}${t}${t}sells:`;
        for (const bc of Object.keys(s.backingCurrencyVolume.sell)) {
            const bcVol = s.backingCurrencyVolume.sell[bc];
            bcVolumeString += `
${t}${t}${t}${t}${color.yellow}${bc}${color.nc}: ${bcVol.raw.toFixed(2)} (${toUSDString(bcVol.usdValue)})`;
        }

        let ret = `${t}${color.purple_bui}${title}${color.nc}:
${t}${t}${color.blue_italic}volume${color.nc}: ${toUSDString(s.usdVolume.buy + s.usdVolume.sell)}
${t}${t}${t}${color.grey_italic}buys${color.nc}: ${color.green_b}${toUSDString(s.usdVolume.buy)}${color.nc}
${t}${t}${t}${color.grey_italic}sells${color.nc}: ${color.red_b}${toUSDString(s.usdVolume.sell)}${color.nc}
${t}${t}${color.blue_italic}trades${color.nc}: ${s.trades.toLocaleString()}
${t}${t}${t}${color.grey_italic}buys${color.nc}: ${s.buy.toLocaleString()}
${t}${t}${t}${color.grey_italic}sells${color.nc}: ${s.sell.toLocaleString()}
${t}${t}${color.blue_italic}avg volume/trade${color.nc}: ${toUSDString((s.avgVolumePerTrade.buy+s.avgVolumePerTrade.sell)/2)}
${t}${t}${t}${color.grey_italic}buys${color.nc}: ${toUSDString(s.avgVolumePerTrade.buy)}
${t}${t}${t}${color.grey_italic}sells${color.nc}: ${toUSDString(s.avgVolumePerTrade.sell)}
${t}${t}${color.blue_italic}high trade${color.nc}: ${toUSDString(s.highTrade)}
${t}${t}${color.blue_italic}low trade${color.nc}: ${toUSDString(s.lowTrade)}
${bcVolumeString} ${s.v2 ? `
${printStats(`${title} v2 trades`, s.v2, tablen+1)}` : ''} ${s.v3 ? `
${printStats(`${title} v3 trades`, s.v3, tablen+1)}` : ''}`
        return ret;
    }

    stats[chain] = calcStats(stats[chain], volume);
    stats[chain][`v${volume.version}`] = calcStats(stats[chain][`v${volume.version}`], volume);
    console.log(`stats:
  elapsed time: ${dt.toLocaleString()} seconds
${stats.eth ? printStats("eth", stats.eth, 1) : ''}
    `)
}

const subscribeToData = function() {
    // Ethereum FilteredTrades websocket
    ShardsSocketClient
    .createConnection({
        chain: EVM.Ethereum,
        shardsApiKey: 'mock-api-key',
        shardsWebsocketId: 'eea27de4-fc98-46e1-b157-c28321f6038c'
    })
    .subscribe((dataType, data)=>{
        captureStats('eth', data)
    })
    .onDisconnect(()=>{
        console.log('disconnected');
    })
    .onError(_err=>{
        console.log(_err)
    });

    // BSC FilteredTrades websocket
    ShardsSocketClient
    .createConnection({
        chain: EVM.BinanceSmartChain,
        shardsApiKey: 'mock-api-key',
        shardsWebsocketId: 'fadfce81-0a1f-4f82-bd2c-71dcef1a2e15'
    })
    .subscribe((dataType, data)=>{
        captureStats('bsc', data)
    })
    .onDisconnect(()=>{
        console.log('disconnected');
    })
    .onError(_err=>{
        console.log(_err)
    });
}

const run = function() {
    subscribeToData();
}

run();