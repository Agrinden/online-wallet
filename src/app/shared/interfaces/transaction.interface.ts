import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { AbstractControl } from '@angular/forms';
import { Moment } from 'moment';
import { CategoryInterface } from './categories/category.interface';

export interface TransactionInterface {
    id: number;
    type: string;
    walletId: string;
    amount: number;
    currency: string;
    category: CategoryInterface;
    subcategory: CategoryInterface;
    payer: string;
    date: string;
    note: string;
}

export interface TransactionDTOInterface {
    amount: string;
    category: {
        id: number;
        categoryType: TransactionTypeEnum;
        color: string;
        name: string;
    };
    date: string;
    notes: string;
    payer: string;
    subcategory: string;
    transactionType: TransactionTypeEnum;
    walletId: number;
}

export interface IncomeDataInterface {
    id: number;
    date: Moment;
    category: CategoryInterface;
    amount: number;
    walletId: number;
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
    id: AbstractControl<number | null>;
    wallet: AbstractControl<string | null>;
    amount: AbstractControl<number | null>;
    category: AbstractControl<CategoryInterface | null>;
    subcategory: AbstractControl<CategoryInterface | null>;
    payer: AbstractControl<string | null>;
    date: AbstractControl<Moment | null>;
    note: AbstractControl<string | null>;
}
