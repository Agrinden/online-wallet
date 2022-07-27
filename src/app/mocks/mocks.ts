import { CurrencyInterface } from '@app/shared/interfaces/currency.interface';

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
