import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';

export const defaultCategories = [
    {
        id: '',
        name: 'Home & utilities',

        transactionType: TransactionTypeEnum,
        subcategories: [
            { name: 'Mortgage' },
            { name: 'Rent' },
            { name: 'Utilities' },
            { name: 'Internet' },
            { name: 'Mobile' },
        ],
    },
    {
        id: '',
        name: 'Insurance & financial',

        transactionType: TransactionTypeEnum,
        subcategories: [
            { name: 'Car insurance' },
            { name: 'Health insurance' },
            { name: 'Loan' },
            { name: 'Bank deposit' },
        ],
    },
    {
        id: '',
        name: 'Food',

        transactionType: TransactionTypeEnum,
        subcategories: [{ name: 'Groseries' }, { name: 'Eating out' }],
    },
    {
        id: '',
        name: 'Entertainment',
        transactionType: TransactionTypeEnum,
        subcategories: [
            { name: 'Coffee & tea' },
            { name: 'Restaurants' },
            { name: 'Books' },
            { name: 'Movies & music' },
            { name: 'Subscriptions' },
            { name: 'Celebrations & gifts' },
        ],
    },
    {
        id: '',
        name: 'Transport & auto',

        transactionType: TransactionTypeEnum,
        subcategories: [{ name: 'Public transport & train' }, { name: 'Petrol' }, { name: 'Road tolls & parking' }],
    },

    {
        id: '',
        name: 'Children',

        transactionType: TransactionTypeEnum,
        subcategories: [{ name: 'Baby products' }, { name: 'Toys for kids' }, { name: 'School' }],
    },
    {
        id: '',
        name: 'Education',
        transactionType: TransactionTypeEnum,
        subcategories: [],
    },
    {
        id: '',
        name: 'Pets',
        transactionType: TransactionTypeEnum,
        subcategories: [],
    },
];
