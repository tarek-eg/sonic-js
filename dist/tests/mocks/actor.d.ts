import { SwapActor, TokenActor, ActorAdapter } from "../../src/integrations";
import { Agent } from '@dfinity/agent';
import { SwapIDL, TokenIDL } from 'declarations';
export declare const mockSwapActor: (params?: Partial<SwapIDL.Swap>) => SwapActor;
export declare const mockTokenActor: (params?: Partial<TokenIDL.Token>) => TokenActor;
export declare const mockAgent: (params?: Partial<Agent>) => Agent;
export declare const mockActorProvider: (params?: Partial<ActorAdapter.Provider>) => ActorAdapter.Provider;
