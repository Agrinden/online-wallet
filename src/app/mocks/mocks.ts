import { ICurrency } from '@app/shared/interfaces/create-wallet.interface';

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

export const CURRENCIES: ICurrency[] = [
    { name: 'USD' },
    { name: 'EUR' },
    { name: 'GBP' },
    { name: 'RUB' },
    { name: 'UAH' },
    { name: 'PLN' },
];
