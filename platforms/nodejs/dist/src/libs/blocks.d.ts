export = BlockLib;
declare class BlockLib extends ShardsLib {
    /**
     * Get the latest block
     * @returns
     */
    getLatestBlock(): Promise<any>;
    getBlockAtTimestamp(_timestamp: any): Promise<any>;
    getBlock(_block: any): Promise<any>;
    getBlocksInBlockRange(_from: any, _to: any): Promise<any>;
    getBlocksInTimeRange(_from: any, _to: any): Promise<any>;
    getBlocks(_blocks: any): Promise<any>;
}
import ShardsLib = require("./lib");
//# sourceMappingURL=blocks.d.ts.map