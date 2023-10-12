export = TransactionLib;
declare class TransactionLib extends ShardsLib {
    /**
     * Returns a paginated response of DEX trades associated with a pool address
     * @param {address} _pool
     * @param {int} _page if response.nextPage is not null, use this to get the next set of data
     */
    getTradesOnPool(_pool: address, _page?: int, _origin?: any, _starttime?: any, _endtime?: any): Promise<any>;
    /**
     * Returns a paginated response of DEX trades associated with a token address
     * @param {address} _token
     * @param {int} _page if response.nextPage is not null, use this to get the next set of data
     */
    getTradesOnToken(_token: address, _page?: int, _origin?: any, _starttime?: any, _endtime?: any): Promise<any>;
}
import ShardsLib = require("./lib");
//# sourceMappingURL=transactions.d.ts.map