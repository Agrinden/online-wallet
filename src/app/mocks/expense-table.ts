import { TransactionInterface } from '@app/shared';

export const EXPENSE_DATA: TransactionInterface[] = [
    {
        id: 1,
        type: 'EXPENSE',
        date: '28/07/2022',
        category: 'Transport & auto',
        subcategory: 'Petrol',
        amount: 1500,
        walletId: 'Wallet 1',
        payer: 'payer1',
        note: 'Oh no what a price!',
    },
    {
        id: 2,
        type: 'EXPENSE',
        date: '20/07/2022',
        category: 'Home & utilities',
        subcategory: 'Rent',
        amount: 600,
        walletId: 'Wallet 2',
        payer: 'payer2',
        note: 'Very nice...',
    },
    {
        id: 3,
        type: 'EXPENSE',
        date: '05/08/2022',
        category: 'Entertainment',
        subcategory: 'Celebrations & gifts',
        amount: 2000,
        walletId: 'Wallet 1',
        payer: 'payer1',
        note: '',
    },
];
