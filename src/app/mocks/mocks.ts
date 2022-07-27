import { ICategory } from '@app/shared/interfaces/category.interface';
import { IWallet } from '@app/shared/interfaces/wallet.interface';

export const mockNotifications = [
    {
        name: 'User1',
        desc: [
            { text: 'Bla-bla-bla ', date: new Date() },
            { text: 'La-la-la ', date: new Date() },
        ],
    },
];

export const mockUser = {
    name: 'mockUser',
    surname: 'Surr',
    role: 'admin',
};

export const WALLETS: IWallet[] = [
    {
        value: '1',
        viewValue: 'Wallet 1',
    },
    {
        value: '2',
        viewValue: 'Wallet 2',
    },
];

export const CATEGORIES: ICategory[] = [
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
];
