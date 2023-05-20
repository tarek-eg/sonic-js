"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../src/utils");
const pair_1 = require("../mocks/pair");
describe('removeEmptyPairs', () => {
    const pairsMock = [
        (0, pair_1.mockPair)({
            token0: 'iq6ry-fiaaa-aaaak-qahmq-cai',
            token1: 'utozz-siaaa-aaaam-qaaxq-cai',
            reserve0: BigInt(0),
            reserve1: BigInt(0),
        }),
        (0, pair_1.mockPair)({
            token0: 'aanaa-xaaaa-aaaah-aaeiq-cai',
            token1: 'n7obp-3aaaa-aaaap-aaaaq-cai',
            reserve0: BigInt(10000),
            reserve1: BigInt(10000),
        }),
    ];
    const pairListMock = {
        [pairsMock[0].token0]: {
            [pairsMock[0].token1]: pairsMock[0],
        },
        [pairsMock[0].token1]: {
            [pairsMock[0].token0]: pairsMock[0],
        },
        [pairsMock[1].token0]: {
            [pairsMock[1].token1]: pairsMock[1],
        },
        [pairsMock[1].token1]: {
            [pairsMock[1].token0]: pairsMock[1],
        },
    };
    test('should return only pairs with reserves', () => {
        const result = (0, utils_1.removeEmptyPairs)(pairListMock);
        expect(result[pairsMock[0].token0][pairsMock[0].token1]).toBeUndefined();
        expect(result[pairsMock[0].token1][pairsMock[0].token0]).toBeUndefined();
        expect(result[pairsMock[1].token0][pairsMock[1].token1]).toBe(pairsMock[1]);
        expect(result[pairsMock[1].token1][pairsMock[1].token0]).toBe(pairsMock[1]);
    });
});
//# sourceMappingURL=pairs.test.js.map