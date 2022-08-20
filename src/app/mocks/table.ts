import { CategoryInterface } from '@app/shared/interfaces/categories/category.interface';
import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { TransactionInterface } from '@app/shared';

export const INCOME_DATA: TransactionInterface[] = [
    {
        id: 1,
        type: TransactionTypeEnum.INCOME,
        date: '28/07/2022',
        category: { id: '', transactionType: TransactionTypeEnum.INCOME, name: 'Transport & auto' },
        subcategory: { id: '', transactionType: TransactionTypeEnum.INCOME, name: '' },
        amount: 1500,
        currency: 'USD',
        walletId: 'Wallet 1',
        payer: '',
        note: 'What a nice surprise!',
    },
    {
        id: 2,
        type: TransactionTypeEnum.INCOME,
        date: '29/07/2022',
        category: { id: '', transactionType: TransactionTypeEnum.INCOME, name: 'Home & utilities' },
        subcategory: { id: '', transactionType: TransactionTypeEnum.INCOME, name: '' },
        amount: 2000,
        currency: 'EUR',
        walletId: 'Wallet 2',
        payer: '',
        note: 'Found it.',
    },
    {
        id: 3,
        type: TransactionTypeEnum.INCOME,
        date: '30/07/2022',
        category: { id: '', transactionType: TransactionTypeEnum.INCOME, name: 'Entertainment' },
        subcategory: { id: '', transactionType: TransactionTypeEnum.INCOME, name: '' },
        amount: 4300,
        currency: 'PLN',
        walletId: 'Wallet 3',
        payer: '',
        note: 'What a nice surprise!',
    },
];
