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
    FilteredTrades: 'filteredTrades',
    FilteredPairs: 'filteredPairs'
};

class ShardsSocketClient {
    constructor() {
        this._url = 'wss://wiretap.web3shards.io';
        this._hook = this._hook.bind(this);
        this._connect = this._connect.bind(this);

    }

    createConnection(_config) {
        let _conn = new ShardsSocketClient();
        return _conn._connect(_config);
    }

    subscribe(_hook) {
        this._emitData = _hook;
        return this;
    }

    onDisconnect(_hook) {
        this._emitDisconnect = _hook;
        return this;
    }

    onError(_hook) {
        this._emitError = _hook;
        return this;
    }

    _connect(_config) {
        try {
            this._config = _config;
            console.log('connecting to web3 shards @ '+this._url);
            this._socket = io(this._url, {
                reconnectionDelayMax: 10000,
                path: `/${this._config.chain}/`
            });
            this._socket.on(NetMsg.Connect, this._hook);
        } catch (_err) {
            console.log(`an error occurred: ${_err}`);
        }
        return this;
    }

    _hook() {
        this._socket.removeAllListeners();
        this._socket.on(NetMsg.Connect, this._hook);
        
        this._socket.on(NetMsg.Handshake, function(_data) {
            if (_data.success) {
                console.log(`handshake confirmed. waiting for data...`);
            }
        }.bind(this));

        this._socket.on(NetMsg.Error, function(_error) {
            if (this._emitError)
                this._emitError(`an error occurred: ${_error.error}`);
        }.bind(this));

        this._socket.on(NetMsg.Disconnect, function() {
            if (this._emitDisconnect)
                this._emitDisconnect();
        }.bind(this));
        
        this._socket.on(NetMsg.NewBlockHeaders, function(_data) {
            if (this._emitData)
                this._emitData(NetMsg.NewBlockHeaders, _data);
        }.bind(this));
        
        this._socket.on(NetMsg.Logs, function(_data) {
            if (this._emitData)
                this._emitData(NetMsg.Logs, _data);
        }.bind(this));
        
        this._socket.on(NetMsg.FilteredTrades, function(_data) {
            if (this._emitData)
                this._emitData(NetMsg.FilteredTrades, _data);
        }.bind(this));
        
        this._socket.on(NetMsg.FilteredPairs, function(_data) {
            if (this._emitData)
                this._emitData(NetMsg.FilteredPairs, _data);
        }.bind(this));

        this._socket.emit(NetMsg.Handshake, {
            apiKey: this._config.shardsApiKey,
            roomId: this._config.shardsWebsocketId
        });
    }

}

module.exports = new ShardsSocketClient();