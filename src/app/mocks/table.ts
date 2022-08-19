import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { IncomeDataInterface } from '@app/shared';

export const INCOME_DATA: IncomeDataInterface[] = [
    {
        id: 1,
        type: TransactionTypeEnum.INCOME,
        date: '28/07/2022',
        category: { id: '', transactionType: TransactionTypeEnum.INCOME, name: 'Gift' },
        amount: 1500,
        walletId: 'Wallet 1',
        note: 'What a nice surprise!',
    },
    {
        id: 2,
        type: TransactionTypeEnum.INCOME,
        date: '29/07/2022',
        category: { id: '', transactionType: TransactionTypeEnum.INCOME, name: 'Credit' },
        amount: 2000,
        walletId: 'Wallet 2',
        note: 'Found it.',
    },
    {
        id: 3,
        type: TransactionTypeEnum.INCOME,
        date: '30/07/2022',
        category: { id: '', transactionType: TransactionTypeEnum.INCOME, name: 'Salary' },
        amount: 4300,
        walletId: 'Wallet 3',
        note: 'What a nice surprise!',
    },
];
