"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockBalance = exports.mockTokenId = exports.mockTokenList = exports.mockSupportedTokenListResponse = exports.mockToken = void 0;
const index_1 = require("index");
const integrations_1 = require("integrations");
const mockToken = ({ decimals, fee, id, name, symbol, totalSupply, } = {}) => ({
    decimals: decimals !== null && decimals !== void 0 ? decimals : 12,
    fee: fee !== null && fee !== void 0 ? fee : BigInt('2000000000'),
    id: id !== null && id !== void 0 ? id : 'aanaa-xaaaa-aaaah-aaeiq-cai',
    name: name !== null && name !== void 0 ? name : 'Cycles',
    symbol: symbol !== null && symbol !== void 0 ? symbol : 'XTC',
    totalSupply: totalSupply !== null && totalSupply !== void 0 ? totalSupply : BigInt('568886793566866910'),
});
exports.mockToken = mockToken;
const mockSupportedTokenListResponse = () => [
    {
        id: 'aanaa-xaaaa-aaaah-aaeiq-cai',
        fee: BigInt('2000000000'),
        decimals: 12,
        name: 'Cycles',
        totalSupply: BigInt('568951992843769366'),
        symbol: 'XTC',
    },
    {
        id: 'utozz-siaaa-aaaam-qaaxq-cai',
        fee: BigInt('0'),
        decimals: 8,
        name: 'WICP',
        totalSupply: BigInt('3851094737272'),
        symbol: 'WICP',
    },
    {
        id: 'onuey-xaaaa-aaaah-qcf7a-cai',
        fee: BigInt('100000'),
        decimals: 8,
        name: 'USDT Test',
        totalSupply: BigInt('100000000000000'),
        symbol: 'USDT',
    },
    {
        id: 'oexpe-biaaa-aaaah-qcf6q-cai',
        fee: BigInt('100000'),
        decimals: 8,
        name: 'USDC Test',
        totalSupply: BigInt('201000000000000'),
        symbol: 'USDC',
    },
    {
        id: 'a7saq-3aaaa-aaaai-qbcdq-cai',
        fee: BigInt('0'),
        decimals: 8,
        name: 'TEST TOKEN',
        totalSupply: BigInt('2156879855'),
        symbol: 'TEST_TOKEN',
    },
    {
        id: 'kftk5-4qaaa-aaaah-aa5lq-cai',
        fee: BigInt('0'),
        decimals: 8,
        name: 'test token',
        totalSupply: BigInt('0'),
        symbol: 'TEST',
    },
    {
        id: 'li5ot-tyaaa-aaaah-aa5ma-cai',
        fee: BigInt('0'),
        decimals: 8,
        name: 'wicp',
        totalSupply: BigInt('0'),
        symbol: 'WICP',
    },
    {
        id: 'gagfc-iqaaa-aaaah-qcdvq-cai',
        fee: BigInt('100000'),
        decimals: 8,
        name: 'WICP Test',
        totalSupply: BigInt('110012000000000'),
        symbol: 'WICP',
    },
    {
        id: 'wjsrf-myaaa-aaaam-qaayq-cai',
        fee: BigInt('0'),
        decimals: 8,
        name: 'wicp',
        totalSupply: BigInt('126500000'),
        symbol: 'WICP',
    },
    {
        id: 'u2nsf-eaaaa-aaaam-qaawa-cai',
        fee: BigInt('0'),
        decimals: 8,
        name: 'wicp',
        totalSupply: BigInt('0'),
        symbol: 'WICP',
    },
    {
        id: 'gvbup-jyaaa-aaaah-qcdwa-cai',
        fee: BigInt('100000'),
        decimals: 8,
        name: 'XTC Test',
        totalSupply: BigInt('110115300000000'),
        symbol: 'XTC',
    },
    {
        id: 'xe4vl-dqaaa-aaaam-qaa7a-cai',
        fee: BigInt('0'),
        decimals: 8,
        name: 'WICP',
        totalSupply: BigInt('0'),
        symbol: 'WICP',
    },
    {
        id: 'cfoim-fqaaa-aaaai-qbcmq-cai',
        fee: BigInt('0'),
        decimals: 8,
        name: 'Beta Token',
        totalSupply: BigInt('8911419172'),
        symbol: 'BTKN',
    },
];
exports.mockSupportedTokenListResponse = mockSupportedTokenListResponse;
const mockTokenList = () => (0, integrations_1.parseSupportedTokenList)((0, exports.mockSupportedTokenListResponse)());
exports.mockTokenList = mockTokenList;
const mockTokenId = () => 'aanaa-xaaaa-aaaah-aaeiq-cai';
exports.mockTokenId = mockTokenId;
const mockBalance = ({ sonic, token, total, } = {}) => ({
    token: token !== null && token !== void 0 ? token : (0, index_1.toBigNumber)(0),
    sonic: sonic !== null && sonic !== void 0 ? sonic : (0, index_1.toBigNumber)(0),
    total: total !== null && total !== void 0 ? total : (0, index_1.toBigNumber)(0),
});
exports.mockBalance = mockBalance;
//# sourceMappingURL=token.js.map