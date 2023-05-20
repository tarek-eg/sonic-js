"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const integrations_1 = require("../../../src/integrations");
const actor_1 = require("../../../src/integrations/actor");
const agent_1 = require("@dfinity/agent");
const principal_1 = require("@dfinity/principal");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const utils_1 = require("utils");
const actor_2 = require("../../mocks/actor");
const pair_1 = require("../../mocks/pair");
const principal_2 = require("../../mocks/principal");
const token_1 = require("../../mocks/token");
jest.mock('@/integrations/actor');
actor_1.createTokenActor.mockImplementation(async () => (0, actor_2.mockTokenActor)());
jest.mock('@dfinity/agent');
agent_1.Actor.agentOf.mockImplementation(() => (0, actor_2.mockAgent)());
describe('SwapCanisterController', () => {
    let swapActor;
    let sut;
    const supportedTokenListResponseMock = (0, token_1.mockSupportedTokenListResponse)();
    const allPairsResponseMock = (0, pair_1.mockAllPairsResponse)();
    beforeEach(() => {
        swapActor = (0, actor_2.mockSwapActor)();
        sut = new integrations_1.SwapCanisterController(swapActor);
    });
    describe('.getTokenList', () => {
        test('should return a parsed list of tokens', async () => {
            const response = await sut.getTokenList();
            supportedTokenListResponseMock.forEach((mock) => {
                expect(response[mock.id]).toEqual(mock);
            });
        });
        test('should store the response inside the class', async () => {
            await sut.getTokenList();
            expect(sut.tokenList).toBeDefined();
            supportedTokenListResponseMock.forEach((mock) => {
                var _a;
                expect((_a = sut.tokenList) === null || _a === void 0 ? void 0 : _a[mock.id]).toEqual(mock);
            });
        });
        test('should call swapActor getSupportedTokenList', async () => {
            const spy = jest.spyOn(swapActor, 'getSupportedTokenList');
            await sut.getTokenList();
            expect(spy).toHaveBeenCalled();
        });
    });
    describe('.getPairsList', () => {
        test('should return a parsed list of pairs', async () => {
            const response = await sut.getPairList();
            allPairsResponseMock.forEach((mock) => {
                if (Number(mock.reserve0) === 0 && Number(mock.reserve1) === 0) {
                    return;
                }
                expect((0, utils_1.serialize)(response[mock.token0][mock.token1])).toEqual((0, utils_1.serialize)(mock));
                expect((0, utils_1.serialize)(response[mock.token1][mock.token0])).toEqual((0, utils_1.serialize)({
                    ...mock,
                    token0: mock.token1,
                    token1: mock.token0,
                    reserve0: mock.reserve1,
                    reserve1: mock.reserve0,
                }));
            });
        });
        test('should store the response inside the class', async () => {
            await sut.getPairList();
            expect(sut.pairList).toBeDefined();
            allPairsResponseMock.forEach((mock) => {
                var _a, _b;
                if (Number(mock.reserve0) === 0 && Number(mock.reserve1) === 0) {
                    return;
                }
                expect((0, utils_1.serialize)((_a = sut.pairList) === null || _a === void 0 ? void 0 : _a[mock.token0][mock.token1])).toEqual((0, utils_1.serialize)(mock));
                expect((0, utils_1.serialize)((_b = sut.pairList) === null || _b === void 0 ? void 0 : _b[mock.token1][mock.token0])).toEqual((0, utils_1.serialize)({
                    ...mock,
                    token0: mock.token1,
                    token1: mock.token0,
                    reserve0: mock.reserve1,
                    reserve1: mock.reserve0,
                }));
            });
        });
        test('should call swapActor getAllPairs', async () => {
            const spy = jest.spyOn(swapActor, 'getAllPairs');
            await sut.getPairList();
            expect(spy).toHaveBeenCalled();
        });
    });
    describe('.getTokenBalances', () => {
        beforeEach(() => {
            sut.tokenList = (0, token_1.mockTokenList)();
        });
        test('should fetch token list if is not present', async () => {
            const spy = jest.spyOn(sut, 'getTokenList');
            sut.tokenList = null;
            await sut.getTokenBalances((0, principal_2.mockPrincipalId)());
            expect(spy).toHaveBeenCalled();
            expect(actor_1.createTokenActor).toHaveBeenCalled();
        });
        test('should not fetch token list if is present', async () => {
            const spy = jest.spyOn(sut, 'getTokenList');
            await sut.getTokenBalances((0, principal_2.mockPrincipalId)());
            expect(spy).not.toHaveBeenCalled();
        });
        test('should return a list of token balances', async () => {
            const response = await sut.getTokenBalances((0, principal_2.mockPrincipalId)());
            Object.keys(sut.tokenList).forEach((tokenId) => {
                expect(response[tokenId].token).toBeInstanceOf(bignumber_js_1.default);
                expect(response[tokenId].sonic).toBeInstanceOf(bignumber_js_1.default);
                expect(response[tokenId].total).toBeInstanceOf(bignumber_js_1.default);
            });
        });
        test('should return a list of token balances with correct values', async () => {
            const response = await sut.getTokenBalances((0, principal_2.mockPrincipalId)());
            Object.values(sut.tokenList).forEach((token) => {
                const tokenBalance = (0, utils_1.toBigNumber)('1').applyDecimals(token.decimals);
                expect(response[token.id].token).toEqual(tokenBalance);
                expect(response[token.id].sonic).toEqual((0, utils_1.toBigNumber)(1));
                expect(response[token.id].total).toEqual((0, utils_1.toBigNumber)(1).plus(tokenBalance));
            });
        });
        test('should call swapActor getUserBalances', async () => {
            const spy = jest.spyOn(swapActor, 'getUserBalances');
            await sut.getTokenBalances((0, principal_2.mockPrincipalId)());
            expect(spy).toHaveBeenCalledWith((0, principal_2.mockPrincipal)());
        });
        test('should use the agent principal if no one is provided', async () => {
            const spy = jest.spyOn(swapActor, 'getUserBalances');
            await sut.getTokenBalances();
            expect(spy).toHaveBeenCalledWith((0, principal_2.mockPrincipal)());
        });
    });
    describe('.getLPBalances', () => {
        test('should fetch the agent principal LP balances', async () => {
            const spy = jest.spyOn(swapActor, 'getUserLPBalancesAbove');
            await sut.getLPBalances();
            expect(spy).toHaveBeenCalledWith((0, principal_2.mockPrincipal)(), BigInt(0));
        });
        test('should fetch given principal LP balances', async () => {
            const spy = jest.spyOn(swapActor, 'getUserLPBalancesAbove');
            const principalMock = (0, principal_2.mockPrincipal)();
            await sut.getLPBalances(principalMock.toString());
            expect(spy).toHaveBeenCalledWith(principalMock, BigInt(0));
        });
        test('should return the parsed response from LP balances', async () => {
            const response = await sut.getLPBalances();
            expect(response).toEqual((0, pair_1.mockLPBalances)());
        });
    });
    describe('.getAgentPrincipal', () => {
        test('should return the principal', async () => {
            const response = await sut.getAgentPrincipal();
            expect(response).toEqual((0, principal_2.mockPrincipal)());
        });
        test('should throw if could not find agent', async () => {
            agent_1.Actor.agentOf.mockImplementationOnce(() => undefined);
            const promise = sut.getAgentPrincipal();
            await expect(promise).rejects.toThrow();
        });
        test('should throw if the principal is anonymous', async () => {
            sut = new integrations_1.SwapCanisterController((0, actor_2.mockSwapActor)());
            agent_1.Actor.agentOf.mockImplementationOnce(() => (0, actor_2.mockAgent)({
                getPrincipal: () => Promise.resolve(principal_1.Principal.anonymous()),
            }));
            const promise = sut.getAgentPrincipal();
            await expect(promise).rejects.toThrowError('Agent principal is anonymous');
        });
    });
    describe('.approve', () => {
        const params = { tokenId: (0, token_1.mockTokenId)(), amount: '10' };
        beforeEach(() => {
            sut.tokenList = (0, token_1.mockTokenList)();
        });
        test('should fetch token list if is not present', async () => {
            const spy = jest.spyOn(sut, 'getTokenList');
            sut.tokenList = null;
            await sut.approve(params);
            expect(spy).toHaveBeenCalled();
            expect(actor_1.createTokenActor).toHaveBeenCalled();
        });
        test('should not fetch token list if is present', async () => {
            const spy = jest.spyOn(sut, 'getTokenList');
            await sut.approve(params);
            expect(spy).not.toHaveBeenCalled();
        });
        test('should create a token actor', async () => {
            await sut.approve(params);
            expect(actor_1.createTokenActor).toHaveBeenCalled();
        });
        test('should call approve on token actor', async () => {
            const spy = jest.fn().mockResolvedValue({ Ok: BigInt(1) });
            actor_1.createTokenActor.mockImplementationOnce(async () => (0, actor_2.mockTokenActor)({ approve: spy }));
            await sut.approve(params);
            expect(spy).toHaveBeenCalled();
        });
        test('should not call approve if already exists allowance', async () => {
            const spy = jest.fn().mockResolvedValue({ Ok: BigInt(1) });
            const allowance = jest.fn().mockResolvedValue(BigInt('10000000000000'));
            actor_1.createTokenActor.mockImplementationOnce(async () => (0, actor_2.mockTokenActor)({ approve: spy, allowance }));
            await sut.approve(params);
            expect(spy).not.toHaveBeenCalled();
        });
        test('should throw for error response', async () => {
            const spy = jest.fn().mockResolvedValue({ Err: { Other: null } });
            actor_1.createTokenActor.mockImplementationOnce(async () => (0, actor_2.mockTokenActor)({ approve: spy }));
            const promise = sut.approve(params);
            await expect(promise).rejects.toThrowError(JSON.stringify({ Other: null }));
        });
        test('should throw if there is no agent principal', async () => {
            agent_1.Actor.agentOf.mockImplementationOnce(() => undefined);
            const promise = sut.approve(params);
            await expect(promise).rejects.toThrow();
        });
    });
    describe('.deposit', () => {
        const params = { tokenId: (0, token_1.mockTokenId)(), amount: '10' };
        test('should call deposit', async () => {
            const spy = jest.spyOn(swapActor, 'deposit');
            await sut.deposit(params);
            expect(spy).toHaveBeenCalled();
        });
        test('should throw on deposit error response', async () => {
            jest
                .spyOn(swapActor, 'deposit')
                .mockResolvedValueOnce({ err: 'error_message' });
            const promise = sut.deposit(params);
            await expect(promise).rejects.toThrowError(JSON.stringify('error_message'));
        });
        test('should call swapActor deposit', async () => {
            const spy = jest.spyOn(swapActor, 'deposit');
            await sut.deposit(params);
            expect(spy).toHaveBeenCalledWith(principal_1.Principal.from(params.tokenId), BigInt(10000000000000));
        });
    });
    describe('.withdraw', () => {
        const params = { tokenId: (0, token_1.mockTokenId)(), amount: '10' };
        beforeEach(() => {
            sut.tokenList = (0, token_1.mockTokenList)();
        });
        test('should fetch token list if is not present', async () => {
            const spy = jest.spyOn(sut, 'getTokenList');
            sut.tokenList = null;
            await sut.withdraw(params);
            expect(spy).toHaveBeenCalled();
            expect(actor_1.createTokenActor).toHaveBeenCalled();
        });
        test('should not fetch token list if is present', async () => {
            const spy = jest.spyOn(sut, 'getTokenList');
            await sut.withdraw(params);
            expect(spy).not.toHaveBeenCalled();
        });
        test('should call withdraw', async () => {
            const spy = jest.spyOn(swapActor, 'withdraw');
            await sut.withdraw(params);
            expect(spy).toHaveBeenCalled();
        });
        test('should throw on withdraw error response', async () => {
            jest
                .spyOn(swapActor, 'withdraw')
                .mockResolvedValueOnce({ err: 'error_message' });
            const promise = sut.withdraw(params);
            await expect(promise).rejects.toThrowError(JSON.stringify('error_message'));
        });
        test('should throw if there is no agent principal', async () => {
            agent_1.Actor.agentOf.mockImplementationOnce(() => undefined);
            const promise = sut.withdraw(params);
            await expect(promise).rejects.toThrow();
        });
        test('should call swapActor withdraw', async () => {
            const spy = jest.spyOn(swapActor, 'withdraw');
            await sut.withdraw(params);
            expect(spy).toHaveBeenCalledWith(principal_1.Principal.from(params.tokenId), BigInt(10000000000000));
        });
    });
    describe('.getTokenBalance', () => {
        const params = {
            tokenId: (0, token_1.mockTokenId)(),
            principalId: (0, principal_2.mockPrincipalId)(),
        };
        test('should return the selected token balance', async () => {
            const result = await sut.getTokenBalance(params);
            expect(result).toEqual({
                sonic: new bignumber_js_1.default(1),
                token: new bignumber_js_1.default(0.000000000001),
                total: new bignumber_js_1.default(1.000000000001),
            });
        });
        test('should return sonic balance equals to 0', async () => {
            jest.spyOn(swapActor, 'getUserBalances').mockResolvedValueOnce([]);
            const result = await sut.getTokenBalance(params);
            expect(result).toEqual({
                sonic: new bignumber_js_1.default(0),
                token: new bignumber_js_1.default(0.000000000001),
                total: new bignumber_js_1.default(0.000000000001),
            });
        });
    });
    describe('.swap', () => {
        const params = {
            amountIn: '0.5',
            tokenIn: 'aanaa-xaaaa-aaaah-aaeiq-cai',
            tokenOut: 'utozz-siaaa-aaaam-qaaxq-cai',
        };
        test('should do a swap', async () => {
            await sut.swap(params);
        });
        test('should throw if not exists token path', () => {
            const promise = sut.swap({
                ...params,
                tokenIn: 'aanaa-xaaaa-aaaah-aaeiq-cai',
                tokenOut: 'onuey-xaaaa-aaaah-qcf7a-cai',
            });
            return expect(promise).rejects.toThrowError('No token path to swap');
        });
        test('should throw if there is not enough token balance', () => {
            const promise = sut.swap({
                ...params,
                amountIn: '1.5',
            });
            return expect(promise).rejects.toThrowError('Not enough aanaa-xaaaa-aaaah-aaeiq-cai to deposit');
        });
        test('should call deposit if there not enough deposited balance', async () => {
            actor_1.createTokenActor.mockImplementationOnce(async () => (0, actor_2.mockTokenActor)({ balanceOf: async () => BigInt('1500000000000') }));
            const spy = jest.spyOn(sut, 'deposit');
            await sut.swap({
                ...params,
                amountIn: '1.5',
            });
            return expect(spy).toHaveBeenCalledWith({
                tokenId: 'aanaa-xaaaa-aaaah-aaeiq-cai',
                amount: '0.5',
            });
        });
        test('should call the actor with right params', async () => {
            jest.useFakeTimers();
            jest.setSystemTime(1);
            const spy = jest.spyOn(swapActor, 'swapExactTokensForTokens');
            await sut.swap(params);
            return expect(spy).toHaveBeenCalledWith(BigInt('500000000000'), BigInt('3181149'), ['aanaa-xaaaa-aaaah-aaeiq-cai', 'utozz-siaaa-aaaam-qaaxq-cai'], (0, principal_2.mockPrincipal)(), BigInt(3000010000000));
        });
        test('should throw if there is an error on response', async () => {
            jest
                .spyOn(swapActor, 'swapExactTokensForTokens')
                .mockResolvedValueOnce({ err: 'error_message' });
            const promise = sut.swap(params);
            await expect(promise).rejects.toThrowError(JSON.stringify('error_message'));
        });
        test('should get token list and pair list if they are not present', async () => {
            const tokenSpy = jest.spyOn(sut, 'getTokenList');
            const pairSpy = jest.spyOn(sut, 'getPairList');
            await sut.swap(params);
            expect(tokenSpy).toHaveBeenCalled();
            expect(pairSpy).toHaveBeenCalled();
        });
        test('should not get token list and pair list if they are present', async () => {
            const tokenSpy = jest.spyOn(sut, 'getTokenList');
            const pairSpy = jest.spyOn(sut, 'getPairList');
            sut.pairList = (0, pair_1.mockPairList)();
            sut.tokenList = (0, token_1.mockTokenList)();
            await sut.swap(params);
            expect(tokenSpy).not.toHaveBeenCalled();
            expect(pairSpy).not.toHaveBeenCalled();
        });
    });
    describe('.addLiquidity', () => {
        const params = {
            amount0: '1.55920683167',
            amount1: '0.1',
            token0: 'aanaa-xaaaa-aaaah-aaeiq-cai',
            token1: 'utozz-siaaa-aaaam-qaaxq-cai',
        };
        beforeAll(() => {
            actor_1.createTokenActor.mockImplementation(async () => (0, actor_2.mockTokenActor)({ balanceOf: async () => BigInt('1500000000000') }));
        });
        afterAll(() => {
            actor_1.createTokenActor.mockImplementation(async () => (0, actor_2.mockTokenActor)());
        });
        test('should add liquidity', async () => {
            await sut.addLiquidity(params);
        });
        test('should throw if there is not enough token balance', async () => {
            actor_1.createTokenActor.mockImplementationOnce(async () => (0, actor_2.mockTokenActor)({ balanceOf: async () => BigInt('0') }));
            await expect(sut.addLiquidity(params)).rejects.toThrow();
        });
        test('should throw if amount0 is invalid', async () => {
            const promise = sut.addLiquidity({ ...params, amount0: '3' });
            await expect(promise).rejects.toThrow();
        });
        test('should throw if amount0 is invalid', async () => {
            const promise = sut.addLiquidity({ ...params, amount1: '3' });
            await expect(promise).rejects.toThrow();
        });
        test('should throw if the pair does not exist', async () => {
            const promise = sut.addLiquidity({
                ...params,
                token0: 'aanaa-xaaaa-aaaah-aaeiq-cai',
                token1: 'onuey-xaaaa-aaaah-qcf7a-cai',
            });
            await expect(promise).rejects.toThrow();
        });
        test('should throw for invalid token amounts', async () => {
            const promise = sut.addLiquidity({
                ...params,
                amount0: '0',
                amount1: '0',
            });
            await expect(promise).rejects.toThrowError('Invalid token amounts');
        });
        test('should call addLiquidity with right params', async () => {
            jest.useFakeTimers();
            jest.setSystemTime(1);
            const spy = jest.spyOn(swapActor, 'addLiquidity');
            await sut.addLiquidity({
                amount0: '0.1',
                amount1: '1.55920683167',
                token0: 'utozz-siaaa-aaaam-qaaxq-cai',
                token1: 'aanaa-xaaaa-aaaah-aaeiq-cai',
                slippage: 10,
            });
            return expect(spy).toHaveBeenCalledWith(principal_1.Principal.fromText('aanaa-xaaaa-aaaah-aaeiq-cai'), principal_1.Principal.fromText('utozz-siaaa-aaaam-qaaxq-cai'), BigInt('1559206831670'), BigInt('10000000'), BigInt('1403286148503'), BigInt('9000000'), BigInt('3000010000000'));
        });
        test('should throw if there is an error on response', async () => {
            jest
                .spyOn(swapActor, 'addLiquidity')
                .mockResolvedValueOnce({ err: 'error_message' });
            const promise = sut.addLiquidity(params);
            await expect(promise).rejects.toThrowError(JSON.stringify('error_message'));
        });
    });
    describe('.removeLiquidity', () => {
        const params = {
            token0: 'aanaa-xaaaa-aaaah-aaeiq-cai',
            token1: 'utozz-siaaa-aaaam-qaaxq-cai',
            amount: '1.5',
        };
        test('should remove the liquidity', async () => {
            await sut.removeLiquidity(params);
        });
        test('should call removeLiquidity with right params', async () => {
            jest.useFakeTimers();
            jest.setSystemTime(1);
            const spy = jest.spyOn(swapActor, 'removeLiquidity');
            await sut.removeLiquidity(params);
            return expect(spy).toHaveBeenCalledWith(principal_1.Principal.fromText('aanaa-xaaaa-aaaah-aaeiq-cai'), principal_1.Principal.fromText('utozz-siaaa-aaaam-qaaxq-cai'), BigInt('150000000'), BigInt('60708094563'), BigInt('389351'), (0, principal_2.mockPrincipal)(), BigInt('3000010000000'));
        });
        test('should throw if pair does not exist', async () => {
            const promise = sut.removeLiquidity({
                ...params,
                token0: 'aanaa-xaaaa-aaaah-aaeiq-cai',
                token1: 'onuey-xaaaa-aaaah-qcf7a-cai',
            });
            await expect(promise).rejects.toThrow();
        });
        test('should throw if the response has error', async () => {
            jest
                .spyOn(swapActor, 'removeLiquidity')
                .mockResolvedValueOnce({ err: 'error_message' });
            const promise = sut.removeLiquidity(params);
            await expect(promise).rejects.toThrowError(JSON.stringify('error_message'));
        });
    });
});
//# sourceMappingURL=controller.test.js.map