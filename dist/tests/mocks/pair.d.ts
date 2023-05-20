import { Pair, SwapIDL } from "../../src/declarations";
export declare const mockPair: ({ blockTimestampLast, creator, id, kLast, lptoken, price0CumulativeLast, price1CumulativeLast, reserve0, reserve1, token0, token1, totalSupply, }?: Partial<Pair.Metadata>) => Pair.Metadata;
export declare const mockAllPairsResponse: () => SwapIDL.PairInfoExt[];
export declare const mockUserLPBalanceResponse: () => [string, bigint][];
export declare const mockPairList: () => Pair.List;
export declare const mockLPBalances: () => Pair.Balances;
