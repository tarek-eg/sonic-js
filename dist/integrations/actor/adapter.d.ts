import { Actor, ActorSubclass, Agent, HttpAgent } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
/**
 * Adapter responsible for creating actors.
 * It can receive a provider to identify the actor like a wallet provider (e.g. Plug).
 */
export declare class ActorAdapter {
    private provider?;
    static DEFAULT_WHITELIST: string[];
    static DEFAULT_HOST: string;
    static readonly actors: ActorAdapter.Actors;
    private options;
    constructor(provider?: ActorAdapter.Provider | undefined, options?: Partial<ActorAdapter.Options>);
    /**
     * Creates a new actor or use from memory if is already created.
     * @param {string} canisterId The canister id of the actor
     * @param {IDL.InterfaceFactory} interfaceFactory The interface factory of the actor
     * @returns {Promise<ActorAdapter.Actor<T>>} The actor
     */
    createActor<T>(canisterId: string, interfaceFactory: IDL.InterfaceFactory): Promise<ActorAdapter.Actor<T>>;
    /**
     * Creates the agent from provider.
     * @param {string[]} extraWhitelist Extra whitelist to add to the default whitelist
     * @returns {Promise<void>}
     */
    private createAgent;
    /**
     * Gets the adapter from an actor.
     * @param {Actor} actor The actor
     * @returns {ActorAdapter | undefined} The adapter or undefined if is not existent
     */
    static adapterOf(actor: Actor): ActorAdapter | undefined;
    /**
     * Create an anonymous actor.
     * @param {string} canisterId The canister id of the actor
     * @param {IDL.InterfaceFactory} interfaceFactory The interface factory of the actor
     * @param {string=ActorAdapter.DEFAULT_HOST} host The IC host to connect to
     * @returns {ActorAdapter.Actor<T>} The anonymous actor
     */
    static createAnonymousActor<T>(canisterId: string, interfaceFactory: IDL.InterfaceFactory, host?: string): Promise<ActorAdapter.Actor<T>>;
}
/**
 * Type definition for the ActorAdapter.
 */
export declare namespace ActorAdapter {
    /**
     * Agent provider interface.
     */
    type Provider = {
        agent: Agent | null;
        createActor<T>(params: CreateActorParams<T>): Promise<ActorSubclass<T>>;
        createAgent(params: CreateAgentParams): Promise<Agent>;
    };
    /**
     * Options for the ActorAdapter.
     */
    type Options = {
        whitelist: string[];
        host: string;
    };
    /**
     * Parameters for creating an actor using the provider.
     */
    interface CreateActorParams<T> {
        agent?: HttpAgent;
        actor?: ActorSubclass<ActorSubclass<T>>;
        canisterId: string;
        interfaceFactory: IDL.InterfaceFactory;
    }
    /**
     * Parameters for creating an agent using the provider.
     */
    interface CreateAgentParams {
        whitelist?: string[];
        host?: string;
    }
    /**
     * Parameters for creating an actor using the ActorAdapter.
     */
    type ActorParams = {
        canisterId?: string;
        interfaceFactory: IDL.InterfaceFactory;
    };
    /**
     * Interface for static stored actors.
     */
    type Actors = Record<string, {
        actor: ActorSubclass<any>;
        adapter: ActorAdapter;
    }>;
    /**
     * Return for the createActor function of the ActorAdapter.
     */
    type Actor<T> = ActorSubclass<T>;
}
