export = ProjectLib;
declare class ProjectLib extends ShardsLib {
    getAllProjects(_page?: number): Promise<any>;
    getActiveProjects(_page?: number): Promise<any>;
    getStaleProjects(_page?: number): Promise<any>;
    getDeadProjects(_page?: number): Promise<any>;
    getTrendingProjects(_period: any, _volume: any, _priceChange: any, _tradeCount: any, _trueValue: any, _page?: number): Promise<any>;
    getProjectWithPoolAddress(_address: any): Promise<any>;
    getProjectWithTokenAddress(_address: any): Promise<any>;
    searchProject(_query: any): Promise<any>;
    /**
     * Returns an array of project info from matching _pool_addresses
     * @param {string[]} _pool_addresses An array of pool addresses
     */
    getProjectsBatchedByPools(_pool_addresses: string[]): Promise<any>;
    /**
     * Returns an array of project info from matching _tokens
     * @param {string[]} _tokens An array of token addresses
     */
    getProjectsBatchedByTokens(_tokens: string[]): Promise<any>;
}
import ShardsLib = require("./lib");
//# sourceMappingURL=projects.d.ts.map