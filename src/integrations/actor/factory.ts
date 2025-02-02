import { SwapIDL, Default, TokenIDL, TokenIDLIcrc1 } from '@/declarations';
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
export type SwapActor = ActorAdapter.Actor<SwapIDL.Swap>;

/**
 * Creates a Swap canister actor.
 * If no option is provided, the actor will be created using the default canister options.
 * @param {CreateSwapActorOptions} options Options for creating the SwapActor
 * @returns {SwapActor} actor instance
 */
export const createSwapActor = ({
  canisterId = Default.SWAP_CANISTER_ID,
  actorAdapter = new ActorAdapter(),
}: CreateSwapActorOptions = {}): Promise<SwapActor> => {
  return actorAdapter.createActor(canisterId, SwapIDL.factory);
};

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
export type TokenActor =
  | ActorAdapter.Actor<TokenIDL.Token>
  | ActorAdapter.Actor<TokenIDLIcrc1.Token>;

/**
 * Creates a DIP20 or ICRC1 Token canister actor.
 * If no option is provided, the actor will be created using the default canister options.
 * @param {CreateTokenActorOptions} options Options for creating the TokenActor
 * @returns {TokenActor} actor instance
 */
export const createTokenActor = ({
  canisterId,
  actorAdapter = new ActorAdapter(),
  isIcrc1 = false,
}: CreateTokenActorOptions): Promise<TokenActor> => {
  if (isIcrc1) {
    return actorAdapter.createActor(canisterId, TokenIDLIcrc1.factory);
  }
  return actorAdapter.createActor(canisterId, TokenIDL.factory);
};
