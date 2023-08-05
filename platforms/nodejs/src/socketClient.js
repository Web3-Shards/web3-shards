'use strict';

const {io} = require('socket.io-client');

const NetMsg = {
    Connect: 'connect',
    Disconnect: 'disconnect',
    Handshake: 'handshake',
    Error: 'error',
    NewBlockHeaders: 'newBlockHeaders',
    Logs: 'logs',
    PendingTransactions: 'pendingTransactions',
    FilteredTrades: 'filteredTrades'
};

class ShardsSocketClient {
    constructor(_config) {
        this._config = _config;
        // this._url = 'ws://wiretap.web3shards.io';
        this._url = 'ws://localhost:3549';
        this._hook = this._hook.bind(this);
        this._handleLog = this._handleLog.bind(this);
    }

    async connect() {
        console.log('connecting to web3 shards @ '+this._url);
        this._socket = io(this._url, {
            reconnectionDelayMax: 10000,
            path: `/${this._config.chain}/`
        });
        this._socket.on(NetMsg.Connect, this._hook);
    }

    _hook() {
        console.log('connected');

        this._socket.on(NetMsg.Error, function(_error) {
            console.log(`an error occurred: ${_error.error}`);
        }.bind(this));

        this._socket.on(NetMsg.Disconnect, function() {
            console.log(`disconnected`);
        }.bind(this));
        
        this._socket.on(NetMsg.FilteredTrades, function(_log) {
            console.log(`log received`);
            this._handleLog(_log);
        }.bind(this));

        this._socket.emit(NetMsg.Handshake, {
            apiKey: this._config.shardsApiKey,
            roomId: this._config.shardsWebsocketId
        });
    }

    _handleLog(_log) {
        if (!_log.topics) return;
        if (_log.topics.length == 0) return;
        const _topic = _log.topics[0];
        if (this._onLiveTradeLog) {
            this._onLiveTradeLog(_log, _topic);
        }
    }

    set onLiveTradeLog(_val) {
        this._onLiveTradeLog = _val;
    }
}

module.exports = ShardsSocketClient;