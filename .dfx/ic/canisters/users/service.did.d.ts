import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : User } |
  { 'err' : string };
export type Result_1 = { 'ok' : boolean } |
  { 'err' : string };
export interface User {
  'alias' : string,
  'urlImage' : string,
  'principalId' : Principal,
}
export interface _SERVICE {
  'SetAlias' : ActorMethod<[Principal, string], Result_1>,
  'createUser' : ActorMethod<[Principal], Result>,
  'findOrCreateUser' : ActorMethod<[Principal], User>,
  'getAllUsers' : ActorMethod<[], Array<User>>,
  'getUser' : ActorMethod<[Principal], Result>,
  'getUserByAlias' : ActorMethod<[string], Result>,
  'totalUsers' : ActorMethod<[], bigint>,
}
export declare const idlFactory: IDL.InterfaceFactory;
