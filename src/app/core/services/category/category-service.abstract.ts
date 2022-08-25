import { CategoryInterface, CategoryTemplateInterface } from '@app/shared';
import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';

export abstract class CategoryService {
    abstract create(category: CategoryTemplateInterface, type: TransactionTypeEnum, parentId?: string | undefined): any;
    abstract getIncomes(): any;
    abstract getExpenses(): any;
    abstract edit(category: CategoryInterface, parentId?: string | undefined): any;
    abstract delete(id: string, parentId?: string | undefined): any;
    abstract isNameUnique(name: string): any;
}
