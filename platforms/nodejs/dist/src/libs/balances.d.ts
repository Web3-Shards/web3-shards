export = BalancesLib;
declare class BalancesLib extends ShardsLib {
    /**
     * Get the latest balances for a given wallet
     * @param {address} _wallet
     * @param {TokenType} _type
     * @param {int} _page
     * @returns a paginated list of balances
     */
    getLatestBalancesOnWallet(_wallet: address, _type: TokenType, _page?: int): Promise<any>;
    /**
     * Get balance history on a given token
     * @param {address} _token
     * @param {TokenType} _type
     * @param {int} _page
     * @returns a paginated list of balances
     */
    getBalancesOnToken(_token: address, _type: TokenType, _page?: int): Promise<any>;
    /**
     * Get balance history on a given wallet
     * @param {address} _wallet
     * @param {TokenType} _type
     * @param {int} _page
     * @returns a paginated list of balances
     */
    getBalancesOnWallet(_wallet: address, _type: TokenType, _page?: int): Promise<any>;
    /**
     * Get balance history for a specific token on a given wallet
     * @param {address} _token
     * @param {address} _wallet
     * @param {TokenType} _type
     * @param {int} _page
     * @returns a paginated list of balances
     */
    getBalancesOnWalletForToken(_wallet: address, _token: address, _type: TokenType, _page?: int): Promise<any>;
}
import ShardsLib = require("./lib");
//# sourceMappingURL=balances.d.ts.map