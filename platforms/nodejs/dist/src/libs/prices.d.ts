export = PriceLib;
declare class PriceLib extends ShardsLib {
    _nativeToken: string;
    getNativePrice(): Promise<any>;
    getAllNativePrices(): Promise<any>;
    getNativePriceAtTime(_timestamp: any): Promise<any>;
    getNativePriceLines(_startTime: any, _endTime: any, _page?: number): Promise<any>;
    getPoolPrice(_address: any): Promise<any>;
    getLatestPoolPriceCandle(_address: any, _interval?: string): Promise<any>;
    getPoolPriceAtTime(_address: any, _timestamp: any): Promise<any>;
    getPoolPriceLines(_address: any, _startTime: any, _endTime: any, _interval?: string, _page?: number): Promise<any>;
    getPoolPriceCandles(_address: any, _startTime: any, _endTime: any, _interval?: string, _page?: number): Promise<any>;
}
import ShardsLib = require("./lib");
//# sourceMappingURL=prices.d.ts.map