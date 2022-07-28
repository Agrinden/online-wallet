export interface ITransactionInterface {
    walletId: string;
    amount: number;
    categoryId: string;
    subcategoryId?: string;
    payerId: string;
    date: string;
    message: string;
}
