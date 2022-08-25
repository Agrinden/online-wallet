import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';

export interface CategoryTemplateInterface {
    name: string;
    colorScheme?: string;
    transactionType: TransactionTypeEnum;
    parentId?: string;
}
