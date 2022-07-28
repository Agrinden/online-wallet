import { AbstractControl } from '@angular/forms';
import { Moment } from 'moment';

export interface TransactionInterface {
    id: string;
    type: string;
    walletId: string;
    amount: number;
    categoryId: string;
    subcategoryId?: string;
    payerId: string;
    date: string;
    message: string;
}

export interface CreateTransactionInterface {
    walletId: string;
    typeId: string;
}

export interface UpdateTransactionInterface extends CreateTransactionInterface {
    id: string;
}

export interface TransactionFormInterface {
    wallet: AbstractControl<string | null>;
    amount: AbstractControl<number | null>;
    category: AbstractControl<string | null>;
    date: AbstractControl<Moment | null>;
    note: AbstractControl<string | null>;
}
