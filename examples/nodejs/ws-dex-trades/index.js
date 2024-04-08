
/* Import Web3Shards */
const Shards = require('web3-shards');
const {EVM, NetMsg} = require('web3-shards/src/defs');

/* Setup Web3Shards Configuration */
const SHARDS_API_KEY = "19ae03c3-d618-46ad-b734-61635284e077";
const SHARDS_WEBSOCKET_ID = "cf7d0c18-2ef6-4393-972c-38a0a2c80f70";
const CHAIN = EVM.Ethereum;

const config = {
    chain: CHAIN,
    shardsApiKey: SHARDS_API_KEY,
    shardsWebsocketId: SHARDS_WEBSOCKET_ID,
}

/**
 * Ingestion function for websocket data
 * @param {NetMsg} _dataType See NetMsg for data types
 * @param {Object} _data Blockchain data object
 */
function acceptData(_dataType, _data) {
    if (_dataType != NetMsg.FilteredTrades) {
        console.warn(`oops! received unexpected data: ${_dataType}`);
        return;
    }
    // Do something cool!
    console.log(`just received data (${_dataType})`);
    console.log(_data)
    console.log(`summary: ${_data.token.substring(0, 8)}... was ${_data.type=='buy'?'bought':'sold'} for $${_data.usd.toFixed(2)}`);
}

/* Connect to Web3Shards Websocket */
Shards.Sockets
.createConnection(config)
.subscribe(acceptData)
.onError(console.log);

// All done :>