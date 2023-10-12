declare const _exports: ShardsSocketClient;
export = _exports;
declare class ShardsSocketClient {
    constructor(_localizedMatcher?: any);
    _localizedMatcher: any;
    _url: string;
    _hook(): void;
    _connect(_config: any): this;
    /**
     * Creates a new websocket connection
     * @param {*} _config Config: {chain,shardsApiKey,shardsWebsocketId}
     * @param {*} _localizedMatcher Object with fields to filter incoming data by.
     * @returns
     */
    createConnection(_config: any, _localizedMatcher?: any): ShardsSocketClient;
    subscribe(_hook: any): this;
    _emitData: any;
    onDisconnect(_hook: any): this;
    _emitDisconnect: any;
    onError(_hook: any): this;
    _emitError: any;
    _config: any;
    _socket: import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>;
}
//# sourceMappingURL=socketClient.d.ts.map