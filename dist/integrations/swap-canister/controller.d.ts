import { Pair, Token, Types } from "../../declarations";
import { Principal } from '@dfinity/principal';
import { SwapActor } from '..';
/**
 * Swap Canister Controller.
 * This class is responsible for handling all the requests related to the swap canister.
 */
export declare class SwapCanisterController {
    private swapActor;
    tokenList: Token.MetadataList | null;
    pairList: Pair.List | null;
    balanceList: Token.BalanceList | null;
    /**
     * Create an instance that communicates with swap canister.
     * Some of the functions uses the actor agent identity to identify the user that is interacting.
     * @param {SwapActor} swapActor swap actor
     */
    constructor(swapActor: SwapActor);
    /**
     * Get the list of supported tokens from swap canister.
     * @returns {Promise<Token.MetadataList>}
     */
    getTokenList(): Promise<Token.MetadataList>;
    /**
     * Get the list of pairs present in swap canister.
     * @returns {Promise<Pair.List>}
     */
    getPairList(): Promise<Pair.List>;
    /**
     * Get the balance of all supported tokens for a given principal id.
     * This function get balances from token and swap canisters.
     * @param {string?} principalId The principal id of the user or the principal from agent will be used
     * @returns {Promise<Token.BalanceList>}
     */
    getTokenBalances(principalId?: string): Promise<Token.BalanceList>;
    /**
     * Get one token balance for a given principal id.
     * @param {SwapCanisterController.GetTokenBalanceParams} params
     * @returns {Promise<Token.Balance>}
     */
    getTokenBalance({ principalId, tokenId, }: SwapCanisterController.GetTokenBalanceParams): Promise<Token.Balance>;
    /**
     * Get the Liquidity Positions balances.
     * @param {string?} principalId The principal id of the user or the principal from agent will be used
     * @returns {Promise<Pair.Balances>}
     */
    getLPBalances(principalId?: string): Promise<Pair.Balances>;
    /**
     * Get the principal of the agent.
     * It is going to throw if the principal is anonymous.
     * @returns {Promise<Principal>}
     */
    getAgentPrincipal(): Promise<Principal>;
    /**
     * Approve transfers from token to swap canister.
     * This function uses the actor agent identity.
     * This function needs to be called before depositing into swap canister.
     * @param {SwapCanisterController.ApproveParams} params
     * @returns {Promise<void>}
     */
    approve({ tokenId, amount, }: SwapCanisterController.ApproveParams): Promise<void>;
    /**
     * Deposit tokens into swap canister.
     * This function uses the actor agent identity.
     * @param {SwapCanisterController.DepositParams} params
     * @returns {Promise<void>}
     */
    deposit({ tokenId, amount, }: SwapCanisterController.DepositParams): Promise<void>;
    /**
     * Check and deposit if is needed for a list of tokens.
     * It is only going to deposit if the amount is not already deposited
     * and if there is enough token balance to deposit.
     * @param {SwapCanisterController.DepositTokensNeededBalanceParams} params
     * returns {Promise<void>}
     */
    depositTokensNeededBalance(params: SwapCanisterController.DepositTokensNeededBalanceParams): Promise<void>;
    /**
     * Withdraw tokens from swap canister.
     * This function uses the actor agent identity.
     * @param {SwapCanisterController.WithdrawParams} params
     * @returns {Promise<void>}
     */
    withdraw({ amount, tokenId, }: SwapCanisterController.WithdrawParams): Promise<void>;
    /**
     * Swaps an amount of tokenIn for tokenOut allowing given slippage.
     * This function uses the actor agent identity.
     * @param {SwapCanisterController.SwapParams} params
     * @returns {Promise<void>}
     */
    swap({ amountIn, tokenIn, tokenOut, slippage, }: SwapCanisterController.SwapParams): Promise<void>;
    /**
     * Add two amounts of tokens to add a pair Liquidity Position.
     * This function uses the actor agent identity.
     * @param {SwapCanisterController.AddLiquidityParams} params
     * @returns {Promise<void>}
     */
    addLiquidity({ token0, token1, ...params }: SwapCanisterController.AddLiquidityParams): Promise<void>;
    /**
     * Removes liquidity by a given Liquidity Position amount.
     * This function uses the actor agent identity.
     * @param {SwapCanisterController.RemoveLiquidityParams} params
     * @returns {Promise<void>}
     */
    removeLiquidity({ token0, token1, ...params }: SwapCanisterController.RemoveLiquidityParams): Promise<void>;
}
/**
 * Type definition for the SwapCanisterController.
 */
export declare namespace SwapCanisterController {
    /**
     * Type definition for params of the approve function.
     * @param {Types.Amount} amount
     * @param {string} tokenId
     */
    type ApproveParams = {
        amount: Types.Amount;
        tokenId: string;
    };
    /**
     * Type definition for params of the deposit function.
     * @param {Types.Amount} amount
     * @param {string} tokenId
     */
    type DepositParams = {
        amount: Types.Amount;
        tokenId: string;
    };
    /**
     * Type definition for params of the withdraw function.
     * @param {Types.Amount} amount
     * @param {string} tokenId
     */
    type WithdrawParams = {
        amount: Types.Amount;
        tokenId: string;
    };
    /**
     * Type definition for params of the swap function.
     * @param {Types.Amount} amountIn Amount of input token to swap
     * @param {string} tokenIn Input token id
     * @param {string} tokenOut Output token id
     * @param {Types.Number} slippage Percentage of slippage allowed
     */
    type SwapParams = {
        tokenIn: string;
        tokenOut: string;
        amountIn: Types.Amount;
        slippage?: Types.Number;
    };
    /**
     * Type definition for params of the getTokenBalance function.
     * @param {string} principalId User's principal id
     * @param {string} tokenId Token id to fetch balance for
     */
    type GetTokenBalanceParams = {
        tokenId: string;
        principalId: string;
    };
    /**
     * Type definition for params of the addLiquidity function.
     * @param {string} token0 Token id
     * @param {string} token1 Token id
     * @param {Types.Amount} amount Amount of token0 to add
     * @param {Types.Amount} amount1 Amount of token1 to add
     * @param {Types.Number} slippage Percentage of slippage allowed
     */
    type AddLiquidityParams = {
        token0: string;
        token1: string;
        amount0: Types.Amount;
        amount1: Types.Amount;
        slippage?: Types.Number;
    };
    /**
     * Type definition for params of the depositTokensNeededBalance function.
     */
    type DepositTokensNeededBalanceParams = DepositParams[];
    /**
     * Type definition for params of the removeLiquidity function.
     * @param {string} token0 Token id
     * @param {string} token1 Token id
     * @param {Types.Amount} amount Liquidity Position amount to remove
     * @param {Types.Number} slippage Percentage of slippage allowed
     */
    type RemoveLiquidityParams = {
        token0: string;
        token1: string;
        amount: Types.Amount;
        slippage?: Types.Number;
    };
}
