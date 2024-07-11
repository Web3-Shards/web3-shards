export let API: {
    Ethereum: {
        V1: {
            _chain: any;
            _url: string;
            blocks: import("./src/libs/blocks");
            projects: import("./src/libs/projects");
            transactions: import("./src/libs/transactions");
            evm: import("./src/libs/evm");
            prices: import("./src/libs/prices");
            balances: import("./src/libs/balances");
            transfers: import("./src/libs/transfers");
            holders: import("./src/libs/holders");
            market: import("./src/libs/markets");
            configure(_config: any): void;
        };
    };
    BSC: {
        V1: {
            _chain: any;
            _url: string;
            blocks: import("./src/libs/blocks");
            projects: import("./src/libs/projects");
            transactions: import("./src/libs/transactions");
            evm: import("./src/libs/evm");
            prices: import("./src/libs/prices");
            balances: import("./src/libs/balances");
            transfers: import("./src/libs/transfers");
            holders: import("./src/libs/holders");
            market: import("./src/libs/markets");
            configure(_config: any): void;
        };
    };
    SHIBARIUM: {
        V1: {
            _chain: any;
            _url: string;
            blocks: import("./src/libs/blocks");
            projects: import("./src/libs/projects");
            transactions: import("./src/libs/transactions");
            evm: import("./src/libs/evm");
            prices: import("./src/libs/prices");
            balances: import("./src/libs/balances");
            transfers: import("./src/libs/transfers");
            holders: import("./src/libs/holders");
            market: import("./src/libs/markets");
            configure(_config: any): void;
        };
    };
    BASE: {
        V1: {
            _chain: any;
            _url: string;
            blocks: import("./src/libs/blocks");
            projects: import("./src/libs/projects");
            transactions: import("./src/libs/transactions");
            evm: import("./src/libs/evm");
            prices: import("./src/libs/prices");
            balances: import("./src/libs/balances");
            transfers: import("./src/libs/transfers");
            holders: import("./src/libs/holders");
            market: import("./src/libs/markets");
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
        _socket: any;
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
        _socket: any;
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
        _socket: any;
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
        _socket: any;
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
        _socket: any;
    };
    _emitError: any;
    _config: any;
    _socket: any;
};
//# sourceMappingURL=index.d.ts.map