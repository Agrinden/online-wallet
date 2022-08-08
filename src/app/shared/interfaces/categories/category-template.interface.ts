import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';

export interface CategoryTemplateInterface {
    name: string;
    colorScheme?: string; // will be replaced with ColorSchemeEnum(could feature)
    transactionType: TransactionTypeEnum;
}
