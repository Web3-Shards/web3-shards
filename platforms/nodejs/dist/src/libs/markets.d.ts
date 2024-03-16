export = MarketLib;
declare class MarketLib extends ShardsLib {
    /**
     * Get market statistics during a period of time
     * @param {int} _startTime unix timestamp seconds
     * @param {int} _endTime unix timestamp seconds
     * @param {int} _page
     * @returns a paginated list of market stats
     */
    getMarketStats(_startTime: int, _endTime: int, _page?: int): Promise<any>;
}
import ShardsLib = require("./lib");
//# sourceMappingURL=markets.d.ts.map