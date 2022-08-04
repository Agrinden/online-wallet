import { CategoryInterface, IncomeWalletInterface } from '@app/shared';
import { CurrencyInterface } from '@app/shared/interfaces/currency.interface';

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

export const CATEGORIES: Observable<CategoryInterface[]> = of([
    {
        value: '1',
        viewValue: 'Salary',
    },
    {
        value: '2',
        viewValue: 'Gift',
    },
    {
        value: '3',
        viewValue: 'Credit',
    },
    {
        value: '4',
        viewValue: 'Found',
    },
]);
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
        name: 'My wallet',
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
