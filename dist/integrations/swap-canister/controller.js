"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapCanisterController = void 0;
const declarations_1 = require("../../declarations");
const math_1 = require("../../math");
const utils_1 = require("../../utils");
const agent_1 = require("@dfinity/agent");
const principal_1 = require("@dfinity/principal");
const _1 = require(".");
const __1 = require("..");
const utils_2 = require("./utils");
const ICRC1_TOKENS = [
    //'SNS-1',
    'zfcdd-tqaaa-aaaaq-aaaga-cai',
    //'CHAT',
    '2ouva-viaaa-aaaaq-aaamq-cai',
    //'ckBTC',
    'mxzaz-hqaaa-aaaar-qaada-cai',
];
/**
 * Swap Canister Controller.
 * This class is responsible for handling all the requests related to the swap canister.
 */
class SwapCanisterController {
    /**
     * Create an instance that communicates with swap canister.
     * Some of the functions uses the actor agent identity to identify the user that is interacting.
     * @param {SwapActor} swapActor swap actor
     */
    constructor(swapActor) {
        this.swapActor = swapActor;
        this.tokenList = null;
        this.pairList = null;
        this.balanceList = null;
    }
    /**
     * Get the list of supported tokens from swap canister.
     * @returns {Promise<Token.MetadataList>}
     */
    async getTokenList() {
        const response = await this.swapActor.getSupportedTokenList();
        const parsedResponse = (0, utils_2.parseSupportedTokenList)(response);
        this.tokenList = parsedResponse;
        return parsedResponse;
    }
    /**
     * Get the list of pairs present in swap canister.
     * @returns {Promise<Pair.List>}
     */
    async getPairList() {
        const response = await this.swapActor.getAllPairs();
        const parsedResponse = (0, utils_2.parseAllPairs)(response);
        this.pairList = parsedResponse;
        return parsedResponse;
    }
    /**
     * Get the balance of all supported tokens for a given principal id.
     * This function get balances from token and swap canisters.
     * @param {string?} principalId The principal id of the user or the principal from agent will be used
     * @returns {Promise<Token.BalanceList>}
     */
    async getTokenBalances(principalId) {
        if (!this.tokenList)
            await this.getTokenList();
        const principal = principalId
            ? principal_1.Principal.fromText(principalId)
            : await this.getAgentPrincipal();
        const tokens = Object.values(this.tokenList);
        // const;
        const tokenBalancePromises = tokens.map((token) => (0, __1.createTokenActor)({
            canisterId: token.id,
            isIcrc1: ICRC1_TOKENS.includes(token.id),
        })
            .then((tokenActor) => {
            return getTokenBalanceFromIcrc1OrDip20(tokenActor, principal);
        })
            .then((balance) => ({
            [token.id]: {
                token: (0, utils_1.toBigNumber)(balance).applyDecimals(token.decimals),
                sonic: (0, utils_1.toBigNumber)(0),
                total: (0, utils_1.toBigNumber)(balance).applyDecimals(token.decimals),
            },
        })));
        const promiseResults = await Promise.all(tokenBalancePromises);
        const balanceList = promiseResults.reduce((acc, result) => ({ ...acc, ...result }), {});
        const sonicBalances = await this.swapActor.getUserBalances(principal);
        sonicBalances.forEach(([tokenId, balance]) => {
            const _balance = (0, utils_1.toBigNumber)(balance).applyDecimals(this.tokenList[tokenId].decimals);
            balanceList[tokenId].sonic = _balance;
            balanceList[tokenId].total = balanceList[tokenId].token.plus(_balance);
        });
        this.balanceList = balanceList;
        return balanceList;
    }
    /**
     * Get one token balance for a given principal id.
     * @param {SwapCanisterController.GetTokenBalanceParams} params
     * @returns {Promise<Token.Balance>}
     */
    async getTokenBalance({ principalId, tokenId, }) {
        var _a;
        const principal = principal_1.Principal.fromText(principalId);
        const tokenActor = await (0, __1.createTokenActor)({
            canisterId: tokenId,
            actorAdapter: __1.ActorAdapter.adapterOf(this.swapActor),
            isIcrc1: ICRC1_TOKENS.includes(tokenId),
        });
        const tokenDecimals = 'decimals' in tokenActor
            ? await tokenActor.decimals()
            : await tokenActor.icrc1_decimals();
        const tokenBalance = (0, utils_1.toBigNumber)('balanceOf' in tokenActor
            ? await tokenActor.balanceOf(principal)
            : await tokenActor.icrc1_balance_of({
                owner: principal,
                subaccount: [],
            })).applyDecimals(tokenDecimals);
        const sonicBalance = (0, utils_1.toBigNumber)((_a = (await this.swapActor.getUserBalances(principal)).find(([id]) => id === tokenId)) === null || _a === void 0 ? void 0 : _a[1]).applyDecimals(tokenDecimals);
        return {
            token: tokenBalance,
            sonic: sonicBalance,
            total: tokenBalance.plus(sonicBalance),
        };
    }
    /**
     * Get the Liquidity Positions balances.
     * @param {string?} principalId The principal id of the user or the principal from agent will be used
     * @returns {Promise<Pair.Balances>}
     */
    async getLPBalances(principalId) {
        const principal = principalId
            ? principal_1.Principal.fromText(principalId)
            : await this.getAgentPrincipal();
        const lpBalances = await this.swapActor.getUserLPBalancesAbove(principal, BigInt(0));
        return (0, _1.parseUserLPBalances)(lpBalances);
    }
    /**
     * Get the principal of the agent.
     * It is going to throw if the principal is anonymous.
     * @returns {Promise<Principal>}
     */
    async getAgentPrincipal() {
        const agent = agent_1.Actor.agentOf(this.swapActor);
        if (!agent)
            throw new Error('Agent principal not found');
        const principal = await agent.getPrincipal();
        if (principal.toString() === principal_1.Principal.anonymous().toString())
            throw new Error('Agent principal is anonymous');
        return agent.getPrincipal();
    }
    /**
     * Approve transfers from token to swap canister.
     * This function uses the actor agent identity.
     * This function needs to be called before depositing into swap canister.
     * @param {SwapCanisterController.ApproveParams} params
     * @returns {Promise<void>}
     */
    async approve({ tokenId, amount, }) {
        if (ICRC1_TOKENS.includes(tokenId)) {
            throw Error("Icrc1 token doesn't support approve");
        }
        const principal = await this.getAgentPrincipal();
        if (!this.tokenList)
            await this.getTokenList();
        const tokenActor = await (0, __1.createTokenActor)({
            canisterId: tokenId,
            actorAdapter: __1.ActorAdapter.adapterOf(this.swapActor),
            isIcrc1: ICRC1_TOKENS.includes(tokenId),
        });
        if (!('allowance' in tokenActor)) {
            throw Error("Icrc1 token doesn't support approve");
        }
        const swapPrincipal = principal_1.Principal.fromText(declarations_1.Default.SWAP_CANISTER_ID);
        const parsedAmount = (0, utils_1.toBigNumber)(amount).removeDecimals(this.tokenList[tokenId].decimals);
        const parsedAllowance = (0, utils_1.toBigNumber)(await tokenActor.allowance(principal, swapPrincipal));
        if (parsedAllowance.gte(parsedAmount))
            return;
        const result = await tokenActor.approve(swapPrincipal, parsedAmount.toBigInt());
        if ('Err' in result)
            throw new Error(JSON.stringify(result.Err));
    }
    /**
     * Deposit tokens into swap canister.
     * This function uses the actor agent identity.
     * @param {SwapCanisterController.DepositParams} params
     * @returns {Promise<void>}
     */
    async deposit({ tokenId, amount, }) {
        await this.approve({ tokenId, amount });
        const parsedAmount = (0, utils_1.toBigNumber)(amount).removeDecimals(this.tokenList[tokenId].decimals);
        const result = await this.swapActor.deposit(principal_1.Principal.fromText(tokenId), parsedAmount.toBigInt());
        if ('err' in result)
            throw new Error(JSON.stringify(result.err));
    }
    /**
     * Check and deposit if is needed for a list of tokens.
     * It is only going to deposit if the amount is not already deposited
     * and if there is enough token balance to deposit.
     * @param {SwapCanisterController.DepositTokensNeededBalanceParams} params
     * returns {Promise<void>}
     */
    async depositTokensNeededBalance(params) {
        if (!this.tokenList)
            await this.getTokenList();
        const principalId = (await this.getAgentPrincipal()).toString();
        for (const { amount, tokenId } of params) {
            const balance = await this.getTokenBalance({
                principalId,
                tokenId,
            });
            if (balance.sonic.lt(amount)) {
                const toDeposit = (0, utils_1.toBigNumber)(amount).minus(balance.sonic);
                const requiredDepositAmount = math_1.Assets.getDepositAmount({
                    token: this.tokenList[tokenId],
                    amount: toDeposit.toString(),
                });
                if (requiredDepositAmount.gt(balance.token)) {
                    throw new Error(`Not enough ${tokenId} to deposit`);
                }
                await this.deposit({ tokenId, amount: toDeposit.toString() });
            }
        }
    }
    /**
     * Withdraw tokens from swap canister.
     * This function uses the actor agent identity.
     * @param {SwapCanisterController.WithdrawParams} params
     * @returns {Promise<void>}
     */
    async withdraw({ amount, tokenId, }) {
        await this.getAgentPrincipal();
        if (!this.tokenList)
            await this.getTokenList();
        const parsedAmount = (0, utils_1.toBigNumber)(amount).removeDecimals(this.tokenList[tokenId].decimals);
        const result = await this.swapActor.withdraw(principal_1.Principal.fromText(tokenId), parsedAmount.toBigInt());
        if ('err' in result)
            throw new Error(JSON.stringify(result.err));
    }
    /**
     * Swaps an amount of tokenIn for tokenOut allowing given slippage.
     * This function uses the actor agent identity.
     * @param {SwapCanisterController.SwapParams} params
     * @returns {Promise<void>}
     */
    async swap({ amountIn, tokenIn, tokenOut, slippage = declarations_1.Default.SLIPPAGE, }) {
        const principal = await this.getAgentPrincipal();
        if (!this.tokenList)
            await this.getTokenList();
        if (!this.pairList)
            await this.getPairList();
        if (!this.pairList || !this.tokenList)
            throw new Error();
        const tokenPath = math_1.Swap.getTokenPaths({
            pairList: this.pairList,
            tokenList: this.tokenList,
            amount: amountIn,
            tokenId: tokenIn,
        })[tokenOut];
        if (!tokenPath)
            throw new Error('No token path to swap');
        await this.depositTokensNeededBalance([
            { tokenId: tokenIn, amount: amountIn },
        ]);
        const _amountIn = (0, utils_1.toBigNumber)(amountIn)
            .removeDecimals(this.tokenList[tokenIn].decimals)
            .toBigInt();
        const amountOutMin = math_1.Swap.getAmountMin({
            amount: tokenPath.amountOut.toString(),
            decimals: this.tokenList[tokenOut].decimals,
            slippage,
        })
            .removeDecimals(this.tokenList[tokenOut].decimals)
            .toBigInt();
        const swapResult = await this.swapActor.swapExactTokensForTokens(_amountIn, amountOutMin, tokenPath.path, principal, (0, _1.getDeadline)());
        if ('err' in swapResult)
            throw new Error(JSON.stringify(swapResult.err));
        return;
    }
    /**
     * Add two amounts of tokens to add a pair Liquidity Position.
     * This function uses the actor agent identity.
     * @param {SwapCanisterController.AddLiquidityParams} params
     * @returns {Promise<void>}
     */
    async addLiquidity({ token0, token1, ...params }) {
        var _a;
        await this.getAgentPrincipal();
        if (!this.tokenList)
            await this.getTokenList();
        if (!this.pairList)
            await this.getPairList();
        if (!this.pairList || !this.tokenList)
            throw new Error();
        const pair = this.pairList[token0][token1];
        if (pair) {
            // Verify correct pair tokens order
            const [pairToken0, pairToken1] = pair.id.split(':');
            if (pairToken0 === token1 && pairToken1 === token0) {
                let aux = token0;
                token0 = token1;
                token1 = aux;
                aux = params.amount0;
                params.amount0 = params.amount1;
                params.amount1 = aux;
            }
        }
        else {
            throw new Error('Pair not created');
        }
        const slippage = (0, utils_1.toBigNumber)((_a = params.slippage) !== null && _a !== void 0 ? _a : declarations_1.Default.SLIPPAGE)
            .dividedBy(100)
            .toNumber();
        // Verify token amounts and received position
        if (math_1.Liquidity.getPosition({
            amount0: params.amount0,
            amount1: params.amount1,
            decimals0: this.tokenList[token0].decimals,
            decimals1: this.tokenList[token1].decimals,
            reserve0: this.pairList[token0][token1].reserve0,
            reserve1: this.pairList[token0][token1].reserve1,
            totalSupply: this.pairList[token0][token1].totalSupply,
            slippage,
        }).isLessThanOrEqualTo(0)) {
            throw new Error('Invalid token amounts');
        }
        await this.depositTokensNeededBalance([
            { tokenId: token0, amount: params.amount0 },
            { tokenId: token1, amount: params.amount1 },
        ]);
        const amount0Desired = (0, utils_1.toBigNumber)(params.amount0)
            .removeDecimals(this.tokenList[token0].decimals)
            .toBigInt();
        const amount1Desired = (0, utils_1.toBigNumber)(params.amount1)
            .removeDecimals(this.tokenList[token1].decimals)
            .toBigInt();
        const amount0Min = (0, utils_1.toBigNumber)(params.amount0)
            .applyTolerance(slippage, 'min')
            .removeDecimals(this.tokenList[token0].decimals)
            .toBigInt();
        const amount1Min = (0, utils_1.toBigNumber)(params.amount1)
            .applyTolerance(slippage, 'min')
            .removeDecimals(this.tokenList[token1].decimals)
            .toBigInt();
        const result = await this.swapActor.addLiquidity(principal_1.Principal.fromText(token0), principal_1.Principal.fromText(token1), amount0Desired, amount1Desired, amount0Min, amount1Min, (0, _1.getDeadline)());
        if ('err' in result)
            throw new Error(JSON.stringify(result.err));
        return;
    }
    /**
     * Removes liquidity by a given Liquidity Position amount.
     * This function uses the actor agent identity.
     * @param {SwapCanisterController.RemoveLiquidityParams} params
     * @returns {Promise<void>}
     */
    async removeLiquidity({ token0, token1, ...params }) {
        var _a;
        const principal = await this.getAgentPrincipal();
        if (!this.tokenList)
            await this.getTokenList();
        if (!this.pairList)
            await this.getPairList();
        if (!this.pairList || !this.tokenList)
            throw new Error();
        const pair = this.pairList[token0][token1];
        if (!pair) {
            throw new Error('Pair not created');
        }
        const amount = (0, utils_1.toBigNumber)(params.amount).removeDecimals(math_1.Liquidity.PAIR_DECIMALS);
        const slippage = (0, utils_1.toBigNumber)((_a = params.slippage) !== null && _a !== void 0 ? _a : declarations_1.Default.SLIPPAGE)
            .dividedBy(100)
            .toNumber();
        const { balance0, balance1 } = math_1.Liquidity.getTokenBalances({
            decimals0: this.tokenList[token0].decimals,
            decimals1: this.tokenList[token1].decimals,
            reserve0: pair.reserve0,
            reserve1: pair.reserve1,
            totalSupply: pair.totalSupply,
            lpBalance: amount,
        });
        const amount0Min = balance0
            .applyTolerance(slippage, 'min')
            .removeDecimals(this.tokenList[token0].decimals)
            .toBigInt();
        const amount1Min = balance1
            .applyTolerance(slippage, 'min')
            .removeDecimals(this.tokenList[token1].decimals)
            .toBigInt();
        const result = await this.swapActor.removeLiquidity(principal_1.Principal.fromText(token0), principal_1.Principal.fromText(token1), amount.toBigInt(), amount0Min, amount1Min, principal, (0, _1.getDeadline)());
        if ('err' in result)
            throw new Error(JSON.stringify(result.err));
        return;
    }
}
exports.SwapCanisterController = SwapCanisterController;
function getTokenBalanceFromIcrc1OrDip20(tokenActor, principal) {
    if ('icrc1_balance_of' in tokenActor) {
        return tokenActor.icrc1_balance_of({
            owner: principal,
            subaccount: [],
        });
    }
    return tokenActor.balanceOf(principal);
}
//# sourceMappingURL=controller.js.map