import { TransactionTypeEnum } from './../shared/enums/transaction-type.enum';
import { TransactionInterface } from '@app/shared';

export const EXPENSE_DATA: TransactionInterface[] = [
    {
        id: 1,
        type: TransactionTypeEnum.EXPENSE,
        date: '28/07/2022',
        category: { id: '', transactionType: TransactionTypeEnum.EXPENSE, name: 'Transport & auto' },
        subcategory: { id: '', transactionType: TransactionTypeEnum.EXPENSE, name: 'Petrol' },
        amount: 1500,
        currency: 'USD',
        walletId: 'Wallet 1',
        payer: 'payer1',
        note: 'Oh no what a price!',
    },
    {
        id: 2,
        type: TransactionTypeEnum.EXPENSE,
        date: '20/07/2022',
        category: { id: '', transactionType: TransactionTypeEnum.EXPENSE, name: 'Home & utilities' },
        subcategory: { id: '', transactionType: TransactionTypeEnum.EXPENSE, name: 'Rent' },
        amount: 600,
        currency: 'EUR',
        walletId: 'Wallet 2',
        payer: 'payer2',
        note: 'Very nice...',
    },
    {
        id: 3,
        type: TransactionTypeEnum.EXPENSE,
        date: '05/08/2022',
        category: { id: '', transactionType: TransactionTypeEnum.EXPENSE, name: 'Entertainment' },
        subcategory: { id: '', transactionType: TransactionTypeEnum.EXPENSE, name: 'Celebrations & gifts' },
        amount: 2000,
        currency: 'PLN',
        walletId: 'Wallet 55',
        payer: 'payer1',
        note: '',
    },
];
