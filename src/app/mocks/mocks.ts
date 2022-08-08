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
        id: '1',
        name: 'My default wallet',
        balance: 10000,
        currency: 'USD',
        isDefault: true,
    },
    {
        id: '2',
        name: 'My wallet 2',
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

export const mockWalletTransactions: TransactionInterface[] = [
    {
        id: '1',
        category: 'Some transaction with long category',
        amount: -10,
        date: '2022-07-20T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '2',
        category: 'Salary',
        amount: -396,
        date: '2022-07-19T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '3',
        category: 'Salary',
        amount: 118,
        date: '2022-07-18T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '4',
        category: 'Salary',
        amount: -11,
        date: '2022-07-17T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '5',
        category: 'Salary',
        amount: -13,
        date: '2022-07-16T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '6',
        category: 'Salary',
        amount: 254,
        date: '2022-07-15T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '7',
        category: 'Salary',
        amount: 479,
        date: '2022-07-14T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '8',
        category: 'Salary',
        amount: -55,
        date: '2022-07-13T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '9',
        category: 'Salary',
        amount: 463,
        date: '2022-07-12T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '10',
        category: 'Salary',
        amount: 234,
        date: '2022-07-11T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '11',
        category: 'Salary',
        amount: -278,
        date: '2022-07-10T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '12',
        category: 'Salary',
        amount: -356,
        date: '2022-07-09T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '13',
        category: 'Salary',
        amount: -254,
        date: '2022-07-08T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '14',
        category: 'Salary',
        amount: 230,
        date: '2022-07-07T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '15',
        category: 'Salary',
        amount: -222,
        date: '2022-07-06T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '16',
        category: 'Salary',
        amount: 163,
        date: '2022-07-05T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '17',
        category: 'Salary',
        amount: -281,
        date: '2022-07-04T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '18',
        category: 'Salary',
        amount: -34,
        date: '2022-07-03T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '19',
        category: 'Salary',
        amount: 431,
        date: '2022-07-02T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
    {
        id: '20',
        category: 'Salary',
        amount: 306,
        date: '2022-07-01T17:26:33.581Z',
        walletId: '',
        transactionType: '',
    },
];
