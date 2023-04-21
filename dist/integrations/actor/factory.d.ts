import { SwapIDL, TokenIDL, TokenIDLIcrc1 } from "../../declarations";
import { ActorAdapter } from './adapter';
/**
 * Options for creating an SwapActor.
 * @param {string} canisterId Swap canister ID, default is applied
 * @param {ActorAdapter} actorAdapter ActorAdapter instance with or without a provider, default is applied
 */
export interface CreateSwapActorOptions {
    canisterId?: string;
    actorAdapter?: ActorAdapter;
}
/**
 * Type of SwapActor.
 */
export declare type SwapActor = ActorAdapter.Actor<SwapIDL.Swap>;
/**
 * Creates a Swap canister actor.
 * If no option is provided, the actor will be created using the default canister options.
 * @param {CreateSwapActorOptions} options Options for creating the SwapActor
 * @returns {SwapActor} actor instance
 */
export declare const createSwapActor: ({ canisterId, actorAdapter, }?: CreateSwapActorOptions) => Promise<SwapActor>;
/**
 * Options for creating an TokenActor.
 * @param {string} canisterId The canister id to create the actor for
 * @param {ActorAdapter} actorAdapter ActorAdapter instance with or without a provider, default is applied
 */
export interface CreateTokenActorOptions {
    canisterId: string;
    actorAdapter?: ActorAdapter;
    isIcrc1: boolean;
}
/**
 * Type of TokenActor.
 */
export declare type TokenActor = ActorAdapter.Actor<TokenIDL.Token> | ActorAdapter.Actor<TokenIDLIcrc1.Token>;
/**
 * Creates a DIP20 or ICRC1 Token canister actor.
 * If no option is provided, the actor will be created using the default canister options.
 * @param {CreateTokenActorOptions} options Options for creating the TokenActor
 * @returns {TokenActor} actor instance
 */
export declare const createTokenActor: ({ canisterId, actorAdapter, isIcrc1, }: CreateTokenActorOptions) => Promise<TokenActor>;
