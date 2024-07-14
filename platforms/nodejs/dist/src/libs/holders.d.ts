export = HolderLib;
declare class HolderLib extends ShardsLib {
    /**
     * Get the latest holder count for a token
     * @param {address} _token
     * @param {TokenType} _type
     * @returns a holder count
     */
    getHolderCount(_token: address, _type: TokenType): Promise<any>;
    /**
     * Get active holders for a token ranked by balance
     * @param {address} _token
     * @param {TokenType} _type
     * @param {int} _page
     * @returns a paginated list of holders
     */
    getHolderList(_token: address, _type: TokenType, _page?: int): Promise<any>;
}
import ShardsLib = require("./lib");
//# sourceMappingURL=holders.d.ts.map