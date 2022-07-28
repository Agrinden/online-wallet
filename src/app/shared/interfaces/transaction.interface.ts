export interface TransactionInterface {
    id: string;
    type: string;
    walletId: string;
    amount: number;
    categoryId: string;
    subcategoryId?: string;
    payerId: string;
    date: string;
    message: string;
}

export interface CreateTransactionInterface {
    walletId: string;
    typeId: string;
}

export interface UpdateTransactionInterface extends CreateTransactionInterface {
    id: string;
}
