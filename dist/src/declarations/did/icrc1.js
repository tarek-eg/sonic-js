"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenIDLIcrc1 = void 0;
class TokenIDLIcrc1 {
}
exports.TokenIDLIcrc1 = TokenIDLIcrc1;
TokenIDLIcrc1.factory = ({ IDL }) => {
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
        callback: IDL.Func([GetTransactionsRequest], [IDL.Record({ transactions: IDL.Vec(Transaction) })], ['query']),
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
        get_transactions: IDL.Func([GetTransactionsRequest], [GetTransactionsResponse], ['query']),
        icrc1_balance_of: IDL.Func([Account], [IDL.Nat], ['query']),
        icrc1_decimals: IDL.Func([], [IDL.Nat8], ['query']),
        icrc1_fee: IDL.Func([], [IDL.Nat], ['query']),
        icrc1_metadata: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, Value))], ['query']),
        icrc1_minting_account: IDL.Func([], [IDL.Opt(Account)], ['query']),
        icrc1_name: IDL.Func([], [IDL.Text], ['query']),
        icrc1_supported_standards: IDL.Func([], [IDL.Vec(StandardRecord)], ['query']),
        icrc1_symbol: IDL.Func([], [IDL.Text], ['query']),
        icrc1_total_supply: IDL.Func([], [IDL.Nat], ['query']),
        icrc1_transfer: IDL.Func([TransferArg], [Result], []),
    });
};
//# sourceMappingURL=icrc1.js.map