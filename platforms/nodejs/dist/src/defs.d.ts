export const SVC_URL: "https://api.web3shards.io/";
export namespace SVC_VERSIONS {
    let V1: string;
}
export namespace EVM {
    let Ethereum: string;
    let BinanceSmartChain: string;
    let Shibarium: string;
}
export namespace Period {
    let MINUTE_1: string;
    let MINUTE_3: string;
    let MINUTE_5: string;
    let MINUTE_15: string;
    let MINUTE_30: string;
    let HOUR_1: string;
    let HOUR_2: string;
    let HOUR_4: string;
    let HOUR_12: string;
    let DAY_1: string;
    let DAY_3: string;
    let WEEK_1: string;
    let MONTH_1: string;
    let MONTH_3: string;
    function fromSecondValue(_period: any): string;
    function fromDataValue(_period: any): string;
    function dataValue(_period: any): "1m" | "3m" | "5m" | "15m" | "30m" | "1h" | "2h" | "4h" | "12h" | "1d" | "3d" | "1w" | "1mo" | "3mo";
    function label(_period: any): "1 minute" | "3 minutes" | "5 minutes" | "15 minutes" | "30 minutes" | "1 hour" | "2 hours" | "4 hours" | "12 hours" | "1 day" | "3 days" | "1 week" | "1 month" | "3 month";
    function shortLabel(_period: any): "1 day" | "1 min" | "3 min" | "5 min" | "15 min" | "30 min" | "1 hr" | "2 hr" | "4 hr" | "12 hr" | "3 day" | "1 wk" | "1 mo" | "3 mo";
    function seconds(_period: any): number;
    let keys: string[];
}
//# sourceMappingURL=defs.d.ts.map