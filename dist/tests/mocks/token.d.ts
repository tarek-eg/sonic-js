import { SwapIDL, Token } from "../../src/declarations";
export declare const mockToken: ({ decimals, fee, id, name, symbol, totalSupply, }?: Partial<SwapIDL.TokenInfoExt>) => SwapIDL.TokenInfoExt;
export declare const mockSupportedTokenListResponse: () => SwapIDL.TokenInfoExt[];
export declare const mockTokenList: () => Token.MetadataList;
export declare const mockTokenId: () => string;
export declare const mockBalance: ({ sonic, token, total, }?: Partial<Token.Balance>) => Token.Balance;
