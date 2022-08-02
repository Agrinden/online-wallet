import { CategoryInterface, IncomeWalletInterface } from '@app/shared';
import { CurrencyInterface } from '@app/shared/interfaces/currency.interface';

import { Observable, of } from 'rxjs';

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
