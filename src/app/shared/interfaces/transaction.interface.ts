import { AbstractControl } from '@angular/forms';
import { Moment } from 'moment';

export interface TransactionInterface {
    id: number;
    type: string;
    walletId: string;
    amount: number;
    category: string;
    subcategory: string;
    payer: string;
    date: string;
    note: string;
}

export interface CreateTransactionInterface {
    walletId: string;
    typeId: string;
}

export interface UpdateTransactionInterface extends CreateTransactionInterface {
    id: string;
}

export interface TransactionFormInterface {
    id: AbstractControl<string | null>;
    wallet: AbstractControl<string | null>;
    amount: AbstractControl<number | null>;
    category: AbstractControl<string | null>;
    subcategory: AbstractControl<string | null>;
    payer: AbstractControl<string | null>;
    date: AbstractControl<Moment | null>;
    note: AbstractControl<string | null>;
}
