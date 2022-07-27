export interface ITransaction {
    walletId: string;
    amount: number;
    categoryId: string;
    subcategoryId?: string;
    payerId: string;
    date: string;
    message: string;
}

export interface IExpense extends ITransaction {}

export interface IIncome extends ITransaction {}
