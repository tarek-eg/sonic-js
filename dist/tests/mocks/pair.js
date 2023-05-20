"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockLPBalances = exports.mockPairList = exports.mockUserLPBalanceResponse = exports.mockAllPairsResponse = exports.mockPair = void 0;
const principal_1 = require("@dfinity/principal");
const integrations_1 = require("integrations");
const mockPair = ({ blockTimestampLast, creator, id, kLast, lptoken, price0CumulativeLast, price1CumulativeLast, reserve0, reserve1, token0, token1, totalSupply, } = {}) => {
    return {
        id: id !== null && id !== void 0 ? id : 'token0:token1',
        price0CumulativeLast: price0CumulativeLast !== null && price0CumulativeLast !== void 0 ? price0CumulativeLast : BigInt('169791302182046275273065174512383941'),
        creator: creator !== null && creator !== void 0 ? creator : principal_1.Principal.fromText('4qehi-lqyo6-afz4c-hwqwo-lubfi-4evgk-5vrn5-rldx2-lheha-xs7a4-gae'),
        reserve0: reserve0 !== null && reserve0 !== void 0 ? reserve0 : BigInt('378214020982958035'),
        reserve1: reserve1 !== null && reserve1 !== void 0 ? reserve1 : BigInt('2599045918344'),
        lptoken: lptoken !== null && lptoken !== void 0 ? lptoken : 'aanaa-xaaaa-aaaah-aaeiq-cai:utozz-siaaa-aaaam-qaaxq-cai',
        totalSupply: totalSupply !== null && totalSupply !== void 0 ? totalSupply : BigInt('963930372035355'),
        token0: token0 !== null && token0 !== void 0 ? token0 : 'aanaa-xaaaa-aaaah-aaeiq-cai',
        token1: token1 !== null && token1 !== void 0 ? token1 : 'utozz-siaaa-aaaam-qaaxq-cai',
        price1CumulativeLast: price1CumulativeLast !== null && price1CumulativeLast !== void 0 ? price1CumulativeLast : BigInt('3595528899597139115174922580717493355824760828'),
        kLast: kLast !== null && kLast !== void 0 ? kLast : BigInt('0'),
        blockTimestampLast: blockTimestampLast !== null && blockTimestampLast !== void 0 ? blockTimestampLast : BigInt('1643382877493031694'),
    };
};
exports.mockPair = mockPair;
const mockAllPairsResponse = () => [
    {
        id: 'aanaa-xaaaa-aaaah-aaeiq-cai:utozz-siaaa-aaaam-qaaxq-cai',
        price0CumulativeLast: BigInt('109155824020700857063784541336863933'),
        creator: principal_1.Principal.fromText('4qehi-lqyo6-afz4c-hwqwo-lubfi-4evgk-5vrn5-rldx2-lheha-xs7a4-gae'),
        reserve0: BigInt('565778441300902550'),
        reserve1: BigInt('3628629825164'),
        lptoken: 'aanaa-xaaaa-aaaah-aaeiq-cai:utozz-siaaa-aaaam-qaaxq-cai',
        totalSupply: BigInt('1390958371708314'),
        token0: 'aanaa-xaaaa-aaaah-aaeiq-cai',
        token1: 'utozz-siaaa-aaaam-qaaxq-cai',
        price1CumulativeLast: BigInt('2653715557084971846979439344462581521897640242'),
        kLast: BigInt('0'),
        blockTimestampLast: BigInt('1643812963540835297'),
    },
    {
        id: 'a7saq-3aaaa-aaaai-qbcdq-cai:wjsrf-myaaa-aaaam-qaayq-cai',
        price0CumulativeLast: BigInt('103334672102411617944258660971823473471340'),
        creator: principal_1.Principal.fromText('lkqmh-5vihe-t5x5j-smuot-vitei-tgfyx-losfh-bbud4-fp2rq-353dj-yqe'),
        reserve0: BigInt('97396835'),
        reserve1: BigInt('84339953'),
        lptoken: 'a7saq-3aaaa-aaaai-qbcdq-cai:wjsrf-myaaa-aaaam-qaayq-cai',
        totalSupply: BigInt('90401944'),
        token0: 'a7saq-3aaaa-aaaai-qbcdq-cai',
        token1: 'wjsrf-myaaa-aaaam-qaayq-cai',
        price1CumulativeLast: BigInt('137806291317899640340088878161901233279230'),
        kLast: BigInt('8207934346650000'),
        blockTimestampLast: BigInt('1639001350592394056'),
    },
    {
        id: 'oexpe-biaaa-aaaah-qcf6q-cai:wjsrf-myaaa-aaaam-qaayq-cai',
        price0CumulativeLast: BigInt('0'),
        creator: principal_1.Principal.fromText('2vxsx-fae'),
        reserve0: BigInt('0'),
        reserve1: BigInt('0'),
        lptoken: 'oexpe-biaaa-aaaah-qcf6q-cai:wjsrf-myaaa-aaaam-qaayq-cai',
        totalSupply: BigInt('0'),
        token0: 'oexpe-biaaa-aaaah-qcf6q-cai',
        token1: 'wjsrf-myaaa-aaaam-qaayq-cai',
        price1CumulativeLast: BigInt('0'),
        kLast: BigInt('0'),
        blockTimestampLast: BigInt('0'),
    },
    {
        id: 'cfoim-fqaaa-aaaai-qbcmq-cai:xe4vl-dqaaa-aaaam-qaa7a-cai',
        price0CumulativeLast: BigInt('0'),
        creator: principal_1.Principal.fromText('2vxsx-fae'),
        reserve0: BigInt('0'),
        reserve1: BigInt('0'),
        lptoken: 'cfoim-fqaaa-aaaai-qbcmq-cai:xe4vl-dqaaa-aaaam-qaa7a-cai',
        totalSupply: BigInt('0'),
        token0: 'cfoim-fqaaa-aaaai-qbcmq-cai',
        token1: 'xe4vl-dqaaa-aaaam-qaa7a-cai',
        price1CumulativeLast: BigInt('0'),
        kLast: BigInt('0'),
        blockTimestampLast: BigInt('0'),
    },
    {
        id: 'a7saq-3aaaa-aaaai-qbcdq-cai:cfoim-fqaaa-aaaai-qbcmq-cai',
        price0CumulativeLast: BigInt('55829381825894764350487484407522750263915544'),
        creator: principal_1.Principal.fromText('tqjnl-eteua-vbnza-3yuzm-a3pnk-mk7zw-ehhwr-eert4-dhlhu-aycmo-zae'),
        reserve0: BigInt('0'),
        reserve1: BigInt('0'),
        lptoken: 'a7saq-3aaaa-aaaai-qbcdq-cai:cfoim-fqaaa-aaaai-qbcmq-cai',
        totalSupply: BigInt('0'),
        token0: 'a7saq-3aaaa-aaaai-qbcdq-cai',
        token1: 'cfoim-fqaaa-aaaai-qbcmq-cai',
        price1CumulativeLast: BigInt('21288491078524716889706976605438884419345868'),
        kLast: BigInt('2954492946802563695'),
        blockTimestampLast: BigInt('1639609398465893790'),
    },
    {
        id: 'oexpe-biaaa-aaaah-qcf6q-cai:onuey-xaaaa-aaaah-qcf7a-cai',
        price0CumulativeLast: BigInt('0'),
        creator: principal_1.Principal.fromText('4qehi-lqyo6-afz4c-hwqwo-lubfi-4evgk-5vrn5-rldx2-lheha-xs7a4-gae'),
        reserve0: BigInt('5000000000000'),
        reserve1: BigInt('5000000000000'),
        lptoken: 'oexpe-biaaa-aaaah-qcf6q-cai:onuey-xaaaa-aaaah-qcf7a-cai',
        totalSupply: BigInt('4999999999000'),
        token0: 'oexpe-biaaa-aaaah-qcf6q-cai',
        token1: 'onuey-xaaaa-aaaah-qcf7a-cai',
        price1CumulativeLast: BigInt('0'),
        kLast: BigInt('25000000000000000000000000'),
        blockTimestampLast: BigInt('1636524536787902866'),
    },
    {
        id: 'gagfc-iqaaa-aaaah-qcdvq-cai:gvbup-jyaaa-aaaah-qcdwa-cai',
        price0CumulativeLast: BigInt('75860386083320136473922812321869497466131066'),
        creator: principal_1.Principal.fromText('4qehi-lqyo6-afz4c-hwqwo-lubfi-4evgk-5vrn5-rldx2-lheha-xs7a4-gae'),
        reserve0: BigInt('4949571804783'),
        reserve1: BigInt('5051500000000'),
        lptoken: 'gagfc-iqaaa-aaaah-qcdvq-cai:gvbup-jyaaa-aaaah-qcdwa-cai',
        totalSupply: BigInt('5000199998998'),
        token0: 'gagfc-iqaaa-aaaah-qcdvq-cai',
        token1: 'gvbup-jyaaa-aaaah-qcdwa-cai',
        price1CumulativeLast: BigInt('72829879624849960903550725329066824091591549'),
        kLast: BigInt('25002000040000000000000000'),
        blockTimestampLast: BigInt('1636555135500526085'),
    },
    {
        id: 'gagfc-iqaaa-aaaah-qcdvq-cai:onuey-xaaaa-aaaah-qcf7a-cai',
        price0CumulativeLast: BigInt('4954335781000000000000000000000000000000'),
        creator: principal_1.Principal.fromText('4qehi-lqyo6-afz4c-hwqwo-lubfi-4evgk-5vrn5-rldx2-lheha-xs7a4-gae'),
        reserve0: BigInt('10000000000000'),
        reserve1: BigInt('10000000000000'),
        lptoken: 'gagfc-iqaaa-aaaah-qcdvq-cai:onuey-xaaaa-aaaah-qcf7a-cai',
        totalSupply: BigInt('9999999998000'),
        token0: 'gagfc-iqaaa-aaaah-qcdvq-cai',
        token1: 'onuey-xaaaa-aaaah-qcf7a-cai',
        price1CumulativeLast: BigInt('4954335781000000000000000000000000000000'),
        kLast: BigInt('100000000000000000000000000'),
        blockTimestampLast: BigInt('1636524565869303906'),
    },
    {
        id: 'gagfc-iqaaa-aaaah-qcdvq-cai:oexpe-biaaa-aaaah-qcf6q-cai',
        price0CumulativeLast: BigInt('0'),
        creator: principal_1.Principal.fromText('4qehi-lqyo6-afz4c-hwqwo-lubfi-4evgk-5vrn5-rldx2-lheha-xs7a4-gae'),
        reserve0: BigInt('5000000000000'),
        reserve1: BigInt('5000000000000'),
        lptoken: 'gagfc-iqaaa-aaaah-qcdvq-cai:oexpe-biaaa-aaaah-qcf6q-cai',
        totalSupply: BigInt('4999999999000'),
        token0: 'gagfc-iqaaa-aaaah-qcdvq-cai',
        token1: 'oexpe-biaaa-aaaah-qcf6q-cai',
        price1CumulativeLast: BigInt('0'),
        kLast: BigInt('25000000000000000000000000'),
        blockTimestampLast: BigInt('1636523989958558122'),
    },
];
exports.mockAllPairsResponse = mockAllPairsResponse;
const mockUserLPBalanceResponse = () => [
    [
        'aanaa-xaaaa-aaaah-aaeiq-cai:utozz-siaaa-aaaam-qaaxq-cai',
        BigInt('3035420898'),
    ],
];
exports.mockUserLPBalanceResponse = mockUserLPBalanceResponse;
const mockPairList = () => (0, integrations_1.parseAllPairs)((0, exports.mockAllPairsResponse)());
exports.mockPairList = mockPairList;
const mockLPBalances = () => (0, integrations_1.parseUserLPBalances)((0, exports.mockUserLPBalanceResponse)());
exports.mockLPBalances = mockLPBalances;
//# sourceMappingURL=pair.js.map