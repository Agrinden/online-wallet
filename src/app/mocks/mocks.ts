import { TransactionType } from '@app/shared/enums/transaction.enum';
import { CategoryInterface } from '@app/shared/interfaces/categories/category.interface';
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

export const CATEGORIES: CategoryInterface[] = [
    {
        id: '1',
        name: 'Food',
        color: '#fffc00',
        transactionType: TransactionType.EXPENSE,
        subcategories: [
            {
                id: '1',
                name: 'Groceries',
                color: '#ff0000',
                categoryId: '1',
            },
            {
                id: '2',
                name: 'Restaurants',
                color: '#ff0000',
                categoryId: '1',
            },
        ],
    },
    {
        id: '2',

        name: 'Transport',
        color: '#0400ff',
        transactionType: TransactionType.EXPENSE,
        subcategories: [
            {
                id: '1',
                name: 'Taxi',
                color: '#ff0000',
                categoryId: '2',
            },
            {
                id: '2',
                name: 'Bus',
                color: '#ff0000',
                categoryId: '2',
            },
        ],
    },
    {
        id: '3',
        name: 'Entertainment',
        transactionType: TransactionType.EXPENSE,
        color: '#24bc5e',
        subcategories: [
            {
                id: '1',
                name: 'Movies',
                color: 'purple',
                categoryId: '3',
            },
            {
                id: '2',
                name: 'TV',
                color: '#ff0000',
                categoryId: '3',
            },
        ],
    },
    {
        id: '4',
        name: 'Shopping',
        color: '#c721ca',
        transactionType: TransactionType.EXPENSE,
        subcategories: [
            {
                id: '1',
                name: 'Clothes',
                color: '#ff0000',
                categoryId: '4',
            },
            {
                id: '2',
                name: 'Shoes',
                color: '#ff0000',
                categoryId: '4',
            },
        ],
    },
    {
        id: '5',
        name: 'Other',
        transactionType: TransactionType.INCOME,
        color: '#eca427',
    },
];
