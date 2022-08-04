import { TransactionType } from '@app/shared/enums/transaction.enum';

export interface CreateCategoryInterface {
    name: string;
    color?: string;
    transactionType: TransactionType;
}
