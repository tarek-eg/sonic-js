"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenActor = exports.createSwapActor = void 0;
const declarations_1 = require("../../declarations");
const adapter_1 = require("./adapter");
/**
 * Creates a Swap canister actor.
 * If no option is provided, the actor will be created using the default canister options.
 * @param {CreateSwapActorOptions} options Options for creating the SwapActor
 * @returns {SwapActor} actor instance
 */
const createSwapActor = ({ canisterId = declarations_1.Default.SWAP_CANISTER_ID, actorAdapter = new adapter_1.ActorAdapter(), } = {}) => {
    return actorAdapter.createActor(canisterId, declarations_1.SwapIDL.factory);
};
exports.createSwapActor = createSwapActor;
/**
 * Creates a DIP20 or ICRC1 Token canister actor.
 * If no option is provided, the actor will be created using the default canister options.
 * @param {CreateTokenActorOptions} options Options for creating the TokenActor
 * @returns {TokenActor} actor instance
 */
const createTokenActor = ({ canisterId, actorAdapter = new adapter_1.ActorAdapter(), isIcrc1 = false, }) => {
    if (isIcrc1) {
        return actorAdapter.createActor(canisterId, declarations_1.TokenIDLIcrc1.factory);
    }
    return actorAdapter.createActor(canisterId, declarations_1.TokenIDL.factory);
};
exports.createTokenActor = createTokenActor;
//# sourceMappingURL=factory.js.map