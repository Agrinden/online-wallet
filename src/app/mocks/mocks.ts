import { CurrencyInterface } from '@app/shared/interfaces/currency.interface';
import { TransactionInterface } from '@shared/interfaces/transaction.interface';
import { WalletInterface } from '@app/shared';

export const mockNotifications = [
    {
        name: 'User1',
        desc: [
            { text: 'Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla', date: new Date() },
            { text: 'La-la-la La-la-la La-la-la', date: new Date() },
        ],
    },
];

export const mockUser = {
    name: 'mockUser',
    surname: 'Surr',
    role: 'admin',
};

export const CURRENCIES: CurrencyInterface[] = [{ name: 'EUR' }, { name: 'GEL' }, { name: 'PLN' }, { name: 'USD' }];

export const mockWallets: WalletInterface[] = [
    {
        id: '123',
        name: 'My default wallet',
        balance: 10000,
        currencyCode: 'USD',
        isDefault: true,
    },
];

export const mockWalletTransactions: TransactionInterface[] = [
    {
        id: '1',
        categoryName: 'Some transaction with long category',
        transactionAmount: -10,
        date: '2022-07-20T17:26:33.581Z',
    },
    {
        id: '2',
        categoryName: 'Salary',
        transactionAmount: -396,
        date: '2022-07-19T17:26:33.581Z',
    },
    {
        id: '3',
        categoryName: 'Salary',
        transactionAmount: 118,
        date: '2022-07-18T17:26:33.581Z',
    },
    {
        id: '4',
        categoryName: 'Salary',
        transactionAmount: -11,
        date: '2022-07-17T17:26:33.581Z',
    },
    {
        id: '5',
        categoryName: 'Salary',
        transactionAmount: -13,
        date: '2022-07-16T17:26:33.581Z',
    },
    {
        id: '6',
        categoryName: 'Salary',
        transactionAmount: 254,
        date: '2022-07-15T17:26:33.581Z',
    },
    {
        id: '7',
        categoryName: 'Salary',
        transactionAmount: 479,
        date: '2022-07-14T17:26:33.581Z',
    },
    {
        id: '8',
        categoryName: 'Salary',
        transactionAmount: -55,
        date: '2022-07-13T17:26:33.581Z',
    },
    {
        id: '9',
        categoryName: 'Salary',
        transactionAmount: 463,
        date: '2022-07-12T17:26:33.581Z',
    },
    {
        id: '10',
        categoryName: 'Salary',
        transactionAmount: 234,
        date: '2022-07-11T17:26:33.581Z',
    },
    {
        id: '11',
        categoryName: 'Salary',
        transactionAmount: -278,
        date: '2022-07-10T17:26:33.581Z',
    },
    {
        id: '12',
        categoryName: 'Salary',
        transactionAmount: -356,
        date: '2022-07-09T17:26:33.581Z',
    },
    {
        id: '13',
        categoryName: 'Salary',
        transactionAmount: -254,
        date: '2022-07-08T17:26:33.581Z',
    },
    {
        id: '14',
        categoryName: 'Salary',
        transactionAmount: 230,
        date: '2022-07-07T17:26:33.581Z',
    },
    {
        id: '15',
        categoryName: 'Salary',
        transactionAmount: -222,
        date: '2022-07-06T17:26:33.581Z',
    },
    {
        id: '16',
        categoryName: 'Salary',
        transactionAmount: 163,
        date: '2022-07-05T17:26:33.581Z',
    },
    {
        id: '17',
        categoryName: 'Salary',
        transactionAmount: -281,
        date: '2022-07-04T17:26:33.581Z',
    },
    {
        id: '18',
        categoryName: 'Salary',
        transactionAmount: -34,
        date: '2022-07-03T17:26:33.581Z',
    },
    {
        id: '19',
        categoryName: 'Salary',
        transactionAmount: 431,
        date: '2022-07-02T17:26:33.581Z',
    },
    {
        id: '20',
        categoryName: 'Salary',
        transactionAmount: 306,
        date: '2022-07-01T17:26:33.581Z',
    },
];
