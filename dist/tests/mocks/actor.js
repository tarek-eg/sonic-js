"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockActorProvider = exports.mockAgent = exports.mockTokenActor = exports.mockSwapActor = void 0;
const pair_1 = require("./pair");
const principal_1 = require("./principal");
const token_1 = require("./token");
const mockSwapActor = (params = {}) => ({
    getSupportedTokenList: async () => (0, token_1.mockSupportedTokenListResponse)(),
    getAllPairs: async () => (0, pair_1.mockAllPairsResponse)(),
    deposit: async () => ({ ok: BigInt(1) }),
    withdraw: async () => ({ ok: BigInt(1) }),
    getUserBalances: async () => [
        ['aanaa-xaaaa-aaaah-aaeiq-cai', BigInt(1000000000000)],
        ['utozz-siaaa-aaaam-qaaxq-cai', BigInt(100000000)],
        ['onuey-xaaaa-aaaah-qcf7a-cai', BigInt(100000000)],
        ['oexpe-biaaa-aaaah-qcf6q-cai', BigInt(100000000)],
        ['a7saq-3aaaa-aaaai-qbcdq-cai', BigInt(100000000)],
        ['kftk5-4qaaa-aaaah-aa5lq-cai', BigInt(100000000)],
        ['li5ot-tyaaa-aaaah-aa5ma-cai', BigInt(100000000)],
        ['gagfc-iqaaa-aaaah-qcdvq-cai', BigInt(100000000)],
        ['u2nsf-eaaaa-aaaam-qaawa-cai', BigInt(100000000)],
        ['gvbup-jyaaa-aaaah-qcdwa-cai', BigInt(100000000)],
        ['xe4vl-dqaaa-aaaam-qaa7a-cai', BigInt(100000000)],
        ['cfoim-fqaaa-aaaai-qbcmq-cai', BigInt(100000000)],
        ['wjsrf-myaaa-aaaam-qaayq-cai', BigInt(100000000)],
    ],
    swapExactTokensForTokens: async () => ({ ok: BigInt(1) }),
    getUserLPBalancesAbove: async () => (0, pair_1.mockUserLPBalanceResponse)(),
    addLiquidity: async () => ({ ok: BigInt(1) }),
    removeLiquidity: async () => ({ ok: BigInt(1) }),
    ...params,
});
exports.mockSwapActor = mockSwapActor;
const mockTokenActor = (params = {}) => ({
    balanceOf: async () => BigInt('1'),
    approve: async () => ({ Ok: BigInt(1) }),
    allowance: async () => BigInt(0),
    decimals: async () => 12,
    ...params,
});
exports.mockTokenActor = mockTokenActor;
const mockAgent = (params = {}) => ({
    getPrincipal: async () => (0, principal_1.mockPrincipal)(),
    ...params,
});
exports.mockAgent = mockAgent;
const mockActorProvider = (params = {}) => ({
    createActor: async () => ({}),
    agent: (0, exports.mockAgent)(),
    createAgent: async () => (0, exports.mockAgent)(),
    ...params,
});
exports.mockActorProvider = mockActorProvider;
//# sourceMappingURL=actor.js.map