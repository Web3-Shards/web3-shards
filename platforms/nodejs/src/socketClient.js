'use strict';

const {io} = require('socket.io-client');

const NetMsg = {
    Connect: 'connect',
    Disconnect: 'disconnect',
    Handshake: 'handshake',
    Error: 'error',
    NewBlockHeaders: 'newBlockHeaders',
    Logs: 'logs',
    FilteredTrades: 'filteredTrades',
    FilteredPairs: 'filteredPairs'
};

class ShardsSocketClient {
    constructor(_localizedMatcher=null) {
        this._localizedMatcher = _localizedMatcher;
        this._url = 'wss://wiretap.web3shards.io';
        this._hook = this._hook.bind(this);
        this._connect = this._connect.bind(this);

    }

    /**
     * Creates a new websocket connection
     * @param {*} _config Config: {chain,shardsApiKey,shardsWebsocketId}
     * @param {*} _localizedMatcher Object with fields to filter incoming data by.
     * @returns 
     */
    createConnection(_config, _localizedMatcher=null) {
        let _conn = new ShardsSocketClient(_localizedMatcher);
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

        let _handshake = {
            apiKey: this._config.shardsApiKey,
            roomId: this._config.shardsWebsocketId
        }

        if (this._localizedMatcher) {
            _handshake.match = this._localizedMatcher;
        }

        this._socket.emit(NetMsg.Handshake, _handshake);
    }

}

module.exports = new ShardsSocketClient();