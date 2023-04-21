import { IDL } from '@dfinity/candid';
import type { Principal } from '@dfinity/principal';

export class TokenIDLIcrc1 {
  static readonly factory: IDL.InterfaceFactory = ({ IDL }) => {
    const GetTransactionsRequest = IDL.Record({
      start: IDL.Nat,
      length: IDL.Nat,
    });
    const Account = IDL.Record({
      owner: IDL.Principal,
      subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    });
    const Burn = IDL.Record({
      from: Account,
      memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
      created_at_time: IDL.Opt(IDL.Nat64),
      amount: IDL.Nat,
    });
    const Mint = IDL.Record({
      to: Account,
      memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
      created_at_time: IDL.Opt(IDL.Nat64),
      amount: IDL.Nat,
    });
    const Transfer = IDL.Record({
      to: Account,
      fee: IDL.Opt(IDL.Nat),
      from: Account,
      memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
      created_at_time: IDL.Opt(IDL.Nat64),
      amount: IDL.Nat,
    });
    const Transaction = IDL.Record({
      burn: IDL.Opt(Burn),
      kind: IDL.Text,
      mint: IDL.Opt(Mint),
      timestamp: IDL.Nat64,
      transfer: IDL.Opt(Transfer),
    });
    const ArchivedTransactionRange = IDL.Record({
      callback: IDL.Func(
        [GetTransactionsRequest],
        [IDL.Record({ transactions: IDL.Vec(Transaction) })],
        ['query']
      ),
      start: IDL.Nat,
      length: IDL.Nat,
    });
    const GetTransactionsResponse = IDL.Record({
      first_index: IDL.Nat,
      log_length: IDL.Nat,
      transactions: IDL.Vec(Transaction),
      archived_transactions: IDL.Vec(ArchivedTransactionRange),
    });
    const Value = IDL.Variant({
      Int: IDL.Int,
      Nat: IDL.Nat,
      Blob: IDL.Vec(IDL.Nat8),
      Text: IDL.Text,
    });
    const StandardRecord = IDL.Record({ url: IDL.Text, name: IDL.Text });
    const TransferArg = IDL.Record({
      to: Account,
      fee: IDL.Opt(IDL.Nat),
      memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
      from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
      created_at_time: IDL.Opt(IDL.Nat64),
      amount: IDL.Nat,
    });
    const TransferError = IDL.Variant({
      GenericError: IDL.Record({
        message: IDL.Text,
        error_code: IDL.Nat,
      }),
      TemporarilyUnavailable: IDL.Null,
      BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
      Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
      BadFee: IDL.Record({ expected_fee: IDL.Nat }),
      CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
      TooOld: IDL.Null,
      InsufficientFunds: IDL.Record({ balance: IDL.Nat }),
    });
    const Result = IDL.Variant({ Ok: IDL.Nat, Err: TransferError });
    return IDL.Service({
      get_transactions: IDL.Func(
        [GetTransactionsRequest],
        [GetTransactionsResponse],
        ['query']
      ),
      icrc1_balance_of: IDL.Func([Account], [IDL.Nat], ['query']),
      icrc1_decimals: IDL.Func([], [IDL.Nat8], ['query']),
      icrc1_fee: IDL.Func([], [IDL.Nat], ['query']),
      icrc1_metadata: IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, Value))],
        ['query']
      ),
      icrc1_minting_account: IDL.Func([], [IDL.Opt(Account)], ['query']),
      icrc1_name: IDL.Func([], [IDL.Text], ['query']),
      icrc1_supported_standards: IDL.Func(
        [],
        [IDL.Vec(StandardRecord)],
        ['query']
      ),
      icrc1_symbol: IDL.Func([], [IDL.Text], ['query']),
      icrc1_total_supply: IDL.Func([], [IDL.Nat], ['query']),
      icrc1_transfer: IDL.Func([TransferArg], [Result], []),
    });
  };
}

export namespace TokenIDLIcrc1 {
  export interface Account {
    owner: Principal;
    subaccount: [] | [Array<number>];
  }
  export interface ArchivedTransactionRange {
    callback: [Principal, string];
    start: bigint;
    length: bigint;
  }
  export interface Burn {
    from: Account;
    memo: [] | [Array<number>];
    created_at_time: [] | [bigint];
    amount: bigint;
  }
  export interface GetTransactionsRequest {
    start: bigint;
    length: bigint;
  }
  export interface GetTransactionsResponse {
    first_index: bigint;
    log_length: bigint;
    transactions: Array<Transaction>;
    archived_transactions: Array<ArchivedTransactionRange>;
  }
  export interface Mint {
    to: Account;
    memo: [] | [Array<number>];
    created_at_time: [] | [bigint];
    amount: bigint;
  }
  export type Result = { Ok: bigint } | { Err: TransferError };
  export interface StandardRecord {
    url: string;
    name: string;
  }
  export interface Transaction {
    burn: [] | [Burn];
    kind: string;
    mint: [] | [Mint];
    timestamp: bigint;
    transfer: [] | [Transfer];
  }
  export interface Transfer {
    to: Account;
    fee: [] | [bigint];
    from: Account;
    memo: [] | [Array<number>];
    created_at_time: [] | [bigint];
    amount: bigint;
  }
  export interface TransferArg {
    to: Account;
    fee: [] | [bigint];
    memo: [] | [Array<number>];
    from_subaccount: [] | [Array<number>];
    created_at_time: [] | [bigint];
    amount: bigint;
  }
  export type TransferError =
    | {
        GenericError: { message: string; error_code: bigint };
      }
    | { TemporarilyUnavailable: null }
    | { BadBurn: { min_burn_amount: bigint } }
    | { Duplicate: { duplicate_of: bigint } }
    | { BadFee: { expected_fee: bigint } }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { TooOld: null }
    | { InsufficientFunds: { balance: bigint } };
  export type Value =
    | { Int: bigint }
    | { Nat: bigint }
    | { Blob: Array<number> }
    | { Text: string };
  export interface Token {
    get_transactions: (
      arg_0: GetTransactionsRequest
    ) => Promise<GetTransactionsResponse>;
    icrc1_balance_of: (arg_0: Account) => Promise<bigint>;
    icrc1_decimals: () => Promise<number>;
    icrc1_fee: () => Promise<bigint>;
    icrc1_metadata: () => Promise<Array<[string, Value]>>;
    icrc1_minting_account: () => Promise<[] | [Account]>;
    icrc1_name: () => Promise<string>;
    icrc1_supported_standards: () => Promise<Array<StandardRecord>>;
    icrc1_symbol: () => Promise<string>;
    icrc1_total_supply: () => Promise<bigint>;
    icrc1_transfer: (arg_0: TransferArg) => Promise<Result>;
  }

  export type Factory = Token;
}
