import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { CategoryInterface } from '@app/shared/interfaces/categories/category.interface';
import { IncomeWalletInterface } from '@app/shared/interfaces/income-wallet.interface';
import { CurrencyInterface } from '@app/shared/interfaces/currency.interface';
import { TransactionInterface } from '@shared/interfaces/transaction.interface';

import { Observable, of } from 'rxjs';
import { WalletInterface } from '@shared/interfaces/wallet.interface';

export const mockNotifications = [
    {
        name: 'User1',
        desc: [
            { text: 'Bla-bla-bla ', date: new Date() },
            { text: 'La-la-la ', date: new Date() },
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

export const WALLETS: Observable<IncomeWalletInterface[]> = of([
    {
        value: '1',
        viewValue: 'Wallet 1',
    },
    {
        value: '2',
        viewValue: 'Wallet 2',
    },
]);

export const CURRENCIES: CurrencyInterface[] = [{ name: 'EUR' }, { name: 'GEL' }, { name: 'PLN' }, { name: 'USD' }];

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
                colorScheme: '#ff0000',
                categoryId: '1',
                transactionType: TransactionTypeEnum.EXPENSE,
            },
            {
                id: '2',
                name: 'Restaurants',
                colorScheme: '#ff0000',
                categoryId: '1',
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
                colorScheme: '#ff0000',
                categoryId: '2',
                transactionType: TransactionTypeEnum.EXPENSE,
            },
            {
                id: '2',
                name: 'Bus',
                colorScheme: '#ff0000',
                categoryId: '2',
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
                colorScheme: '#ff0000',
                categoryId: '3',
                transactionType: TransactionTypeEnum.EXPENSE,
            },
            {
                id: '2',
                name: 'TV',
                colorScheme: '#ff0000',
                categoryId: '3',
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
                colorScheme: '#ff0000',
                categoryId: '4',
                transactionType: TransactionTypeEnum.EXPENSE,
            },
            {
                id: '2',
                name: 'Shoes',
                colorScheme: '#ff0000',
                categoryId: '4',
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

export const mockWallets: WalletInterface[] = [
    {
        id: '1',
        name: 'My default wallet',
        balance: 10000,
        currency: 'USD',
        isDefault: true,
    },
    {
        id: '2',
        name: 'test',
        balance: 10000,
        currency: 'USD',
        isDefault: false,
    },
    {
        id: '3',
        name: 'My wallet 3',
        balance: 10000,
        currency: 'USD',
        isDefault: false,
    },
    {
        id: '4',
        name: 'My wallet 4',
        balance: 10000,
        currency: 'USD',
        isDefault: false,
    },
];

export const mockWalletTransactions: TransactionInterface[] = (() => {
    return new Array(20).fill(null).map((_, index) => {
        return {
            id: index,
            category: 'Salary',
            amount: Math.round(Math.random() * 1000 - 500),
            date: `2022-07-${30 - index}T17:26:33.581Z`,
            walletId: '',
            type: '',
            subcategory: '',
            payer: '',
            note: '',
        };
    });
})();
