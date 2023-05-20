"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const integrations_1 = require("../../../src/integrations");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const pair_1 = require("../../mocks/pair");
const token_1 = require("../../mocks/token");
describe('parseSupportedTokenList', () => {
    test('should parse correctly a token list response', () => {
        const responseMock = (0, token_1.mockSupportedTokenListResponse)();
        const parsedResponse = (0, integrations_1.parseSupportedTokenList)(responseMock);
        expect(parsedResponse['aanaa-xaaaa-aaaah-aaeiq-cai']).toEqual(responseMock[0]);
        expect(parsedResponse['utozz-siaaa-aaaam-qaaxq-cai']).toEqual(responseMock[1]);
    });
});
describe('parseAllPairs', () => {
    test('should parse correctly an all pairs response', () => {
        const responseMock = (0, pair_1.mockAllPairsResponse)();
        const parsedResponse = (0, integrations_1.parseAllPairs)(responseMock);
        expect(parsedResponse['aanaa-xaaaa-aaaah-aaeiq-cai']['utozz-siaaa-aaaam-qaaxq-cai']).toMatchObject(responseMock[0]);
        expect(parsedResponse['utozz-siaaa-aaaam-qaaxq-cai']['aanaa-xaaaa-aaaah-aaeiq-cai']).toMatchObject({
            ...responseMock[0],
            token0: 'utozz-siaaa-aaaam-qaaxq-cai',
            token1: 'aanaa-xaaaa-aaaah-aaeiq-cai',
            reserve0: responseMock[0].reserve1,
            reserve1: responseMock[0].reserve0,
        });
    });
});
describe('getDeadline', () => {
    test('should return a deadline', () => {
        jest.useFakeTimers();
        jest.setSystemTime(1);
        const deadline = (0, integrations_1.getDeadline)();
        expect(deadline).toEqual(BigInt(3000010000000));
    });
});
describe('parseUserLPBalances', () => {
    test('should parse the response of getUserLPBalances', () => {
        expect((0, integrations_1.parseUserLPBalances)((0, pair_1.mockUserLPBalanceResponse)())).toEqual({
            'aanaa-xaaaa-aaaah-aaeiq-cai:utozz-siaaa-aaaam-qaaxq-cai': new bignumber_js_1.default('3035420898'),
        });
    });
});
//# sourceMappingURL=utils.test.js.map