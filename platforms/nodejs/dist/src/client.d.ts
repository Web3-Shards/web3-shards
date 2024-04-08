declare class ShardsClient {
    constructor(_chain: any, _version: any);
    _chain: any;
    _url: string;
    blocks: import("./libs/blocks");
    projects: import("./libs/projects");
    transactions: import("./libs/transactions");
    evm: import("./libs/evm");
    prices: import("./libs/prices");
    balances: import("./libs/balances");
    transfers: import("./libs/transfers");
    holders: import("./libs/holders");
    market: import("./libs/markets");
    /**
     * Configure the web3-shards client with your preferred settings:
     *  - apiKey: Your api key
     *  - maxRequestsPerSecond: Default is 10. Helps prevent accidentally exceeding your allowance. Set to -1 for "unlimited".
     *  - logger: Default is 1. 0=none,1=errors,2=verbose
     * @param {Object} _config
     */
    configure(_config: any): void;
}
export namespace Ethereum {
    let V1: ShardsClient;
}
export namespace BSC {
    let V1_1: ShardsClient;
    export { V1_1 as V1 };
}
export namespace SHIBARIUM {
    let V1_2: ShardsClient;
    export { V1_2 as V1 };
}
export namespace BASE {
    let V1_3: ShardsClient;
    export { V1_3 as V1 };
}
export {};
//# sourceMappingURL=client.d.ts.map