"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorAdapter = void 0;
const declarations_1 = require("../../declarations");
const agent_1 = require("@dfinity/agent");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
/**
 * Adapter responsible for creating actors.
 * It can receive a provider to identify the actor like a wallet provider (e.g. Plug).
 */
class ActorAdapter {
    constructor(provider, options = {}) {
        var _a, _b;
        this.provider = provider;
        this.options = {
            host: (_a = options.host) !== null && _a !== void 0 ? _a : ActorAdapter.DEFAULT_HOST,
            whitelist: (_b = options.whitelist) !== null && _b !== void 0 ? _b : ActorAdapter.DEFAULT_WHITELIST,
        };
    }
    /**
     * Creates a new actor or use from memory if is already created.
     * @param {string} canisterId The canister id of the actor
     * @param {IDL.InterfaceFactory} interfaceFactory The interface factory of the actor
     * @returns {Promise<ActorAdapter.Actor<T>>} The actor
     */
    async createActor(canisterId, interfaceFactory) {
        var _a, _b, _c;
        if (ActorAdapter.actors[canisterId]) {
            if (this.provider) {
                const currentPrincipal = await ((_a = agent_1.Actor.agentOf(ActorAdapter.actors[canisterId].actor)) === null || _a === void 0 ? void 0 : _a.getPrincipal());
                const providerPrincipal = await ((_c = (_b = this.provider) === null || _b === void 0 ? void 0 : _b.agent) === null || _c === void 0 ? void 0 : _c.getPrincipal());
                if ((currentPrincipal === null || currentPrincipal === void 0 ? void 0 : currentPrincipal.toString()) === (providerPrincipal === null || providerPrincipal === void 0 ? void 0 : providerPrincipal.toString())) {
                    return ActorAdapter.actors[canisterId].actor;
                }
            }
            else {
                return ActorAdapter.actors[canisterId].actor;
            }
        }
        let actor;
        if (!this.provider) {
            actor = await ActorAdapter.createAnonymousActor(canisterId, interfaceFactory, this.options.host);
        }
        else {
            await this.createAgent([canisterId]);
            actor = await this.provider.createActor({
                canisterId,
                interfaceFactory,
            });
        }
        ActorAdapter.actors[canisterId] = { actor, adapter: this };
        return actor;
    }
    /**
     * Creates the agent from provider.
     * @param {string[]} extraWhitelist Extra whitelist to add to the default whitelist
     * @returns {Promise<void>}
     */
    async createAgent(extraWhitelist = []) {
        if (this.provider) {
            const whitelistSet = new Set([
                ...this.options.whitelist,
                ...extraWhitelist,
                ...Object.keys(ActorAdapter.actors),
            ]);
            const agent = await this.provider.createAgent({
                whitelist: Array.from(whitelistSet),
                host: this.options.host,
            });
            if (declarations_1.Default.ENV === 'development' && agent.fetchRootKey) {
                await agent.fetchRootKey();
            }
        }
    }
    /**
     * Gets the adapter from an actor.
     * @param {Actor} actor The actor
     * @returns {ActorAdapter | undefined} The adapter or undefined if is not existent
     */
    static adapterOf(actor) {
        const canisterId = agent_1.Actor.canisterIdOf(actor).toString();
        if (ActorAdapter.actors[canisterId]) {
            return ActorAdapter.actors[canisterId].adapter;
        }
    }
    /**
     * Create an anonymous actor.
     * @param {string} canisterId The canister id of the actor
     * @param {IDL.InterfaceFactory} interfaceFactory The interface factory of the actor
     * @param {string=ActorAdapter.DEFAULT_HOST} host The IC host to connect to
     * @returns {ActorAdapter.Actor<T>} The anonymous actor
     */
    static async createAnonymousActor(canisterId, interfaceFactory, host = ActorAdapter.DEFAULT_HOST) {
        const agent = new agent_1.HttpAgent({ host, fetch: cross_fetch_1.default });
        if (declarations_1.Default.ENV === 'development') {
            await agent.fetchRootKey();
        }
        return agent_1.Actor.createActor(interfaceFactory, {
            agent,
            canisterId,
        });
    }
}
exports.ActorAdapter = ActorAdapter;
ActorAdapter.DEFAULT_WHITELIST = [declarations_1.Default.SWAP_CANISTER_ID];
ActorAdapter.DEFAULT_HOST = declarations_1.Default.IC_HOST;
ActorAdapter.actors = {};
//# sourceMappingURL=adapter.js.map