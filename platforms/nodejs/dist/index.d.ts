export let API: {
    Ethereum: {
        V1: {
            _chain: any;
            _url: string;
            blocks: import("./src/libs/blocks");
            pools: import("./src/libs/pools");
            projects: import("./src/libs/projects");
            transactions: import("./src/libs/transactions");
            evm: import("./src/libs/evm");
            prices: import("./src/libs/prices");
            configure(_config: any): void;
        };
    };
    BSC: {
        V1: {
            _chain: any;
            _url: string;
            blocks: import("./src/libs/blocks");
            pools: import("./src/libs/pools");
            projects: import("./src/libs/projects");
            transactions: import("./src/libs/transactions");
            evm: import("./src/libs/evm");
            prices: import("./src/libs/prices");
            configure(_config: any): void;
        };
    };
    SHIBARIUM: {
        V1: {
            _chain: any;
            _url: string;
            blocks: import("./src/libs/blocks");
            pools: import("./src/libs/pools");
            projects: import("./src/libs/projects");
            transactions: import("./src/libs/transactions");
            evm: import("./src/libs/evm");
            prices: import("./src/libs/prices");
            configure(_config: any): void;
        };
    };
};
export let Sockets: {
    _localizedMatcher: any;
    _url: string;
    _hook(): void;
    _connect(_config: any): {
        _localizedMatcher: any;
        _url: string;
        _hook(): void;
        _connect(_config: any): any;
        createConnection(_config: any, _localizedMatcher?: any): any;
        subscribe(_hook: any): any;
        _emitData: any;
        onDisconnect(_hook: any): any;
        _emitDisconnect: any;
        onError(_hook: any): any;
        _emitError: any;
        _config: any;
        _socket: import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>;
    };
    createConnection(_config: any, _localizedMatcher?: any): {
        _localizedMatcher: any;
        _url: string;
        _hook(): void;
        _connect(_config: any): any;
        createConnection(_config: any, _localizedMatcher?: any): any;
        subscribe(_hook: any): any;
        _emitData: any;
        onDisconnect(_hook: any): any;
        _emitDisconnect: any;
        onError(_hook: any): any;
        _emitError: any;
        _config: any;
        _socket: import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>;
    };
    subscribe(_hook: any): {
        _localizedMatcher: any;
        _url: string;
        _hook(): void;
        _connect(_config: any): any;
        createConnection(_config: any, _localizedMatcher?: any): any;
        subscribe(_hook: any): any;
        _emitData: any;
        onDisconnect(_hook: any): any;
        _emitDisconnect: any;
        onError(_hook: any): any;
        _emitError: any;
        _config: any;
        _socket: import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>;
    };
    _emitData: any;
    onDisconnect(_hook: any): {
        _localizedMatcher: any;
        _url: string;
        _hook(): void;
        _connect(_config: any): any;
        createConnection(_config: any, _localizedMatcher?: any): any;
        subscribe(_hook: any): any;
        _emitData: any;
        onDisconnect(_hook: any): any;
        _emitDisconnect: any;
        onError(_hook: any): any;
        _emitError: any;
        _config: any;
        _socket: import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>;
    };
    _emitDisconnect: any;
    onError(_hook: any): {
        _localizedMatcher: any;
        _url: string;
        _hook(): void;
        _connect(_config: any): any;
        createConnection(_config: any, _localizedMatcher?: any): any;
        subscribe(_hook: any): any;
        _emitData: any;
        onDisconnect(_hook: any): any;
        _emitDisconnect: any;
        onError(_hook: any): any;
        _emitError: any;
        _config: any;
        _socket: import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>;
    };
    _emitError: any;
    _config: any;
    _socket: import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>;
};
//# sourceMappingURL=index.d.ts.map