export = CoinRankerLib;
declare class CoinRankerLib extends ShardsLib {
    getTrendingList(): Promise<any>;
    getRecentDipperList(): Promise<any>;
    getHighVolumeList(): Promise<any>;
    getHighLiquidityList(): Promise<any>;
    getHighLifetimeReturnList(): Promise<any>;
}
import ShardsLib = require("./lib");
//# sourceMappingURL=coinranker.d.ts.map