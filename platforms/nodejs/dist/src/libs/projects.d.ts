export = ProjectLib;
declare class ProjectLib extends ShardsLib {
    getAllProjects(_page?: number): Promise<any>;
    getActiveProjects(_page?: number): Promise<any>;
    getStaleProjects(_page?: number): Promise<any>;
    getDeadProjects(_page?: number): Promise<any>;
    getTrendingProjects(_period: any, _volume: any, _priceChange: any, _tradeCount: any, _trueValue: any): Promise<any>;
    getProjectWithPoolAddress(_address: any): Promise<any>;
    getProjectWithTokenAddress(_address: any): Promise<any>;
    searchProject(_query: any): Promise<any>;
}
import ShardsLib = require("./lib");
//# sourceMappingURL=projects.d.ts.map