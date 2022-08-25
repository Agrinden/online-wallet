import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { CategoryInterface } from '@app/shared/interfaces/categories/category.interface';
import { IncomeWalletInterface } from '@app/shared/interfaces/income-wallet.interface';
import { TransactionInterface } from '@shared/interfaces/transaction.interface';

import { Observable, of } from 'rxjs';
import { WalletInterface } from '@shared/interfaces/wallet.interface';
import { ReportInterface } from '@shared/interfaces/custom-report-interface';

export const mockNotifications = [
    {
        name: 'User1',
        desc: [
            { text: 'Message1', date: new Date() },
            { text: 'Message2', date: new Date() },
        ],
    },
];

export const mockUser = of({
    name: 'mockUser',
    surname: 'Surr',
    role: 'admin',
});

export const payers$ = of([
    {
        name: 'payer1',
    },
    {
        name: 'payer2',
    },
]);

export const CURRENCIES: string[] = ['EUR', 'USD', 'GEL', 'PLN'];

export const CATEGORIES: CategoryInterface[] = [
    {
        id: '1',
        name: 'Food',
        colorScheme: '#fffc00',
        transactionType: TransactionTypeEnum.EXPENSE,
        subcategories: [
            {
                id: '1',
                name: 'Groceries',
                colorScheme: '#fffc00',
                parentId: '1',
                transactionType: TransactionTypeEnum.EXPENSE,
            },
            {
                id: '2',
                name: 'Restaurants',
                colorScheme: '#f5c242',
                parentId: '1',
                transactionType: TransactionTypeEnum.EXPENSE,
            },
        ],
    },
    {
        id: '2',
        name: 'Transport',
        colorScheme: '#0400ff',
        transactionType: TransactionTypeEnum.EXPENSE,
        subcategories: [
            {
                id: '1',
                name: 'Taxi',
                colorScheme: '#42daf5',
                parentId: '2',
                transactionType: TransactionTypeEnum.EXPENSE,
            },
            {
                id: '2',
                name: 'Bus',
                colorScheme: '#8f77bf',
                parentId: '2',
                transactionType: TransactionTypeEnum.EXPENSE,
            },
        ],
    },
    {
        id: '3',
        name: 'Entertainment',
        transactionType: TransactionTypeEnum.EXPENSE,
        colorScheme: '#24bc5e',
        subcategories: [
            {
                id: '1',
                name: 'Movies',
                colorScheme: '#42daf5',
                parentId: '3',
                transactionType: TransactionTypeEnum.EXPENSE,
            },
            {
                id: '2',
                name: 'TV',
                colorScheme: '#12e034',
                parentId: '3',
                transactionType: TransactionTypeEnum.EXPENSE,
            },
        ],
    },
    {
        id: '4',
        name: 'Shopping',
        colorScheme: '#c721ca',
        transactionType: TransactionTypeEnum.EXPENSE,
        subcategories: [
            {
                id: '1',
                name: 'Clothes',
                colorScheme: '#12e034',
                parentId: '4',
                transactionType: TransactionTypeEnum.EXPENSE,
            },
            {
                id: '2',
                name: 'Shoes',
                colorScheme: '#bf9577',
                parentId: '4',
                transactionType: TransactionTypeEnum.EXPENSE,
            },
        ],
    },
    {
        id: '5',
        name: 'Other',
        transactionType: TransactionTypeEnum.INCOME,
        colorScheme: '#eca427',
    },
];

export const mockWalletTransactions: TransactionInterface[] = (() => {
    return new Array(20).fill(null).map((_, index) => {
        return {
            id: index,
            category: { id: '', transactionType: TransactionTypeEnum.INCOME, name: 'Salary' },
            amount: Math.round(Math.random() * 1000 - 500),
            date: `2022-07-${30 - index}T17:26:33.581Z`,
            walletId: '',
            currency: '',
            type: '',
            subcategory: { id: '', transactionType: TransactionTypeEnum.INCOME, name: 'Freelance' },
            payer: '',
            note: '',
        };
    });
})();

export const mockReport: ReportInterface = {
    expense: [
        { category: 'Food', amount: 150, payer: 'Me' },
        { category: 'Food', amount: 350, payer: 'Joe' },
        { category: 'Health', amount: 50, payer: 'Me' },
    ],
    income: [
        { category: 'Salary', amount: 3500 },
        { category: 'Gift', amount: 1100 },
    ],
};
