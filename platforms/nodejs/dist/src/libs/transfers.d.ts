export = TransferLib;
declare class TransferLib extends ShardsLib {
    /**
     * Get transfer history on a given token
     * @param {address} _token
     * @param {TokenType} _type
     * @param {int} _page
     * @returns a paginated list of transfers
     */
    getTransfersOnToken(_token: address, _type: TokenType, _page?: int): Promise<any>;
    /**
     * Get transfer history on a given wallet
     * @param {address} _wallet
     * @param {TokenType} _type
     * @param {int} _page
     * @returns a paginated list of transfers
     */
    getTransfersOnWallet(_wallet: address, _type: TokenType, _page?: int): Promise<any>;
    /**
     * Get transfer history for a specific token on a given wallet
     * @param {address} _token
     * @param {address} _wallet
     * @param {TokenType} _type
     * @param {int} _page
     * @returns a paginated list of transfers
     */
    getTransfersOnWalletForToken(_wallet: address, _token: address, _type: TokenType, _page?: int): Promise<any>;
}
import ShardsLib = require("./lib");
//# sourceMappingURL=transfers.d.ts.map