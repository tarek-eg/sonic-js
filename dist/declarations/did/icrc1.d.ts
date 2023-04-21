import { IDL } from '@dfinity/candid';
import type { Principal } from '@dfinity/principal';
export declare class TokenIDLIcrc1 {
    static readonly factory: IDL.InterfaceFactory;
}
export declare namespace TokenIDLIcrc1 {
    interface Account {
        owner: Principal;
        subaccount: [] | [Array<number>];
    }
    interface ArchivedTransactionRange {
        callback: [Principal, string];
        start: bigint;
        length: bigint;
    }
    interface Burn {
        from: Account;
        memo: [] | [Array<number>];
        created_at_time: [] | [bigint];
        amount: bigint;
    }
    interface GetTransactionsRequest {
        start: bigint;
        length: bigint;
    }
    interface GetTransactionsResponse {
        first_index: bigint;
        log_length: bigint;
        transactions: Array<Transaction>;
        archived_transactions: Array<ArchivedTransactionRange>;
    }
    interface Mint {
        to: Account;
        memo: [] | [Array<number>];
        created_at_time: [] | [bigint];
        amount: bigint;
    }
    type Result = {
        Ok: bigint;
    } | {
        Err: TransferError;
    };
    interface StandardRecord {
        url: string;
        name: string;
    }
    interface Transaction {
        burn: [] | [Burn];
        kind: string;
        mint: [] | [Mint];
        timestamp: bigint;
        transfer: [] | [Transfer];
    }
    interface Transfer {
        to: Account;
        fee: [] | [bigint];
        from: Account;
        memo: [] | [Array<number>];
        created_at_time: [] | [bigint];
        amount: bigint;
    }
    interface TransferArg {
        to: Account;
        fee: [] | [bigint];
        memo: [] | [Array<number>];
        from_subaccount: [] | [Array<number>];
        created_at_time: [] | [bigint];
        amount: bigint;
    }
    type TransferError = {
        GenericError: {
            message: string;
            error_code: bigint;
        };
    } | {
        TemporarilyUnavailable: null;
    } | {
        BadBurn: {
            min_burn_amount: bigint;
        };
    } | {
        Duplicate: {
            duplicate_of: bigint;
        };
    } | {
        BadFee: {
            expected_fee: bigint;
        };
    } | {
        CreatedInFuture: {
            ledger_time: bigint;
        };
    } | {
        TooOld: null;
    } | {
        InsufficientFunds: {
            balance: bigint;
        };
    };
    type Value = {
        Int: bigint;
    } | {
        Nat: bigint;
    } | {
        Blob: Array<number>;
    } | {
        Text: string;
    };
    interface Token {
        get_transactions: (arg_0: GetTransactionsRequest) => Promise<GetTransactionsResponse>;
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
    type Factory = Token;
}
