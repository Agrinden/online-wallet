import { IncomeTableInterface } from './../shared/interfaces/income-table.interface';

export const TABLE: IncomeTableInterface[] = [
    {
        id: 1,
        date: '28/07/2022',
        category: 'Gift',
        amount: '1500',
        walletId: 'Wallet 1',
        note: 'What a nice surprise!',
    },
    {
        id: 2,
        date: '29/07/2022',
        category: 'Credit',
        amount: '2000',
        walletId: 'Wallet 2',
        note: 'Found it.',
    },
    {
        id: 3,
        date: '30/07/2022',
        category: 'Salary',
        amount: '4300',
        walletId: 'Wallet 3',
        note: 'What a nice surprise!',
    },
];
