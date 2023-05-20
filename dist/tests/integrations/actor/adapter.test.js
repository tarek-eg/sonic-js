"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const integrations_1 = require("../../../src/integrations");
const declarations_1 = require("../../../src/declarations");
const actor_1 = require("../../mocks/actor");
const agent_1 = require("@dfinity/agent");
const principal_1 = require("@dfinity/principal");
jest.mock('@dfinity/agent');
agent_1.Actor.agentOf.mockImplementation(() => (0, actor_1.mockAgent)());
agent_1.Actor.createActor.mockImplementation(() => (0, actor_1.mockSwapActor)());
describe('ActorAdapter', () => {
    let sut;
    beforeEach(() => {
        sut = new integrations_1.ActorAdapter();
    });
    test('should create an adapter', () => {
        expect(sut).toBeDefined();
    });
    describe('.createActor', () => {
        test('should create an actor', async () => {
            const actor = await sut.createActor(declarations_1.Default.SWAP_CANISTER_ID, declarations_1.SwapIDL.factory);
            expect(actor).toBeDefined();
        });
        test('should return an already existent actor', async () => {
            const actorMock = (0, actor_1.mockTokenActor)();
            integrations_1.ActorAdapter.actors[declarations_1.Default.SWAP_CANISTER_ID] = {
                actor: actorMock,
                adapter: new integrations_1.ActorAdapter(),
            };
            const actor = await sut.createActor(declarations_1.Default.SWAP_CANISTER_ID, declarations_1.SwapIDL.factory);
            expect(actor).toBe(actorMock);
            delete integrations_1.ActorAdapter.actors[declarations_1.Default.SWAP_CANISTER_ID];
        });
        test('should create an agent using the provider', async () => {
            const actorProviderMock = (0, actor_1.mockActorProvider)({ agent: null });
            const createAgentSpy = jest.spyOn(actorProviderMock, 'createAgent');
            const createActorSpy = jest.spyOn(actorProviderMock, 'createActor');
            sut = new integrations_1.ActorAdapter(actorProviderMock);
            await sut.createActor(declarations_1.Default.SWAP_CANISTER_ID, declarations_1.SwapIDL.factory);
            expect(createAgentSpy).toHaveBeenCalled();
            expect(createActorSpy).toHaveBeenCalledWith({
                canisterId: declarations_1.Default.SWAP_CANISTER_ID,
                interfaceFactory: declarations_1.SwapIDL.factory,
            });
        });
        test('should not create agent if already exists', async () => {
            const actorProviderMock = (0, actor_1.mockActorProvider)();
            const createAgentSpy = jest.spyOn(actorProviderMock, 'createAgent');
            sut = new integrations_1.ActorAdapter(actorProviderMock);
            await sut.createActor(declarations_1.Default.SWAP_CANISTER_ID, declarations_1.SwapIDL.factory);
            expect(createAgentSpy).not.toHaveBeenCalled();
        });
        test('should return the already created actor with provider', async () => {
            const actorMock = (0, actor_1.mockSwapActor)();
            integrations_1.ActorAdapter.actors[declarations_1.Default.SWAP_CANISTER_ID] = {
                actor: actorMock,
                adapter: new integrations_1.ActorAdapter(),
            };
            const actorProviderMock = (0, actor_1.mockActorProvider)();
            const createActorSpy = jest.spyOn(actorProviderMock, 'createActor');
            sut = new integrations_1.ActorAdapter(actorProviderMock);
            await sut.createActor(declarations_1.Default.SWAP_CANISTER_ID, declarations_1.SwapIDL.factory);
            expect(createActorSpy).not.toHaveBeenCalled();
        });
        test('should create new actor with provider', async () => {
            agent_1.Actor.agentOf.mockImplementation(() => (0, actor_1.mockAgent)({
                getPrincipal: () => Promise.resolve(principal_1.Principal.anonymous()),
            }));
            const actorMock = (0, actor_1.mockSwapActor)();
            integrations_1.ActorAdapter.actors[declarations_1.Default.SWAP_CANISTER_ID] = {
                actor: actorMock,
                adapter: new integrations_1.ActorAdapter(),
            };
            const actorProviderMock = (0, actor_1.mockActorProvider)();
            const createActorSpy = jest.spyOn(actorProviderMock, 'createActor');
            sut = new integrations_1.ActorAdapter(actorProviderMock);
            await sut.createActor(declarations_1.Default.SWAP_CANISTER_ID, declarations_1.SwapIDL.factory);
            expect(createActorSpy).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=adapter.test.js.map