export = PoolLib;
declare class PoolLib extends ShardsLib {
    getPoolWithPoolAddress(_address: any): Promise<any>;
    getPoolWithTokenAddress(_address: any): Promise<any>;
    searchPool(_query: any): Promise<any>;
}
import ShardsLib = require("./lib");
//# sourceMappingURL=pools.d.ts.map