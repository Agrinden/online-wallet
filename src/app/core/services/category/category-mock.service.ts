import { CoreModule } from '@core/core.module';
import { Injectable } from '@angular/core';
import { CategoryInterface, CategoryTemplateInterface } from '@app/shared';
import { map, Observable, of } from 'rxjs';
import { CATEGORIES } from '@app/mocks';
import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { CategoryService } from './category-service.abstract';

@Injectable({
    providedIn: CoreModule,
})
export class CategoryMockService extends CategoryService {
    private categories: CategoryInterface[] = CATEGORIES;

    public create(
        category: CategoryTemplateInterface,
        type: TransactionTypeEnum,
        parentId?: string
    ): Observable<CategoryInterface> {
        if (parentId) {
            category.parentId = parentId;
            const parentCategory = this.categories.find((c) => c.id === category.parentId);
            if (parentCategory) {
                parentCategory.subcategories?.push({ ...category, transactionType: type, id: this.generateId() });
            }
        } else {
            if (type === TransactionTypeEnum.EXPENSE) {
                this.categories.push({
                    ...category,
                    transactionType: type,
                    id: this.generateId(),
                    subcategories: [],
                });
            } else {
                this.categories.push({
                    ...category,
                    transactionType: type,
                    id: this.generateId(),
                });
            }
        }
        return of({
            ...category,
            transactionType: type,
            id: this.generateId(),
        });
    }

    public getIncomes(): Observable<CategoryInterface[]> {
        return of(this.categories).pipe(
            map((categories: CategoryInterface[]) =>
                categories.filter(
                    (category: CategoryInterface) => category.transactionType === TransactionTypeEnum.INCOME
                )
            )
        );
    }

    public getExpenses(): Observable<CategoryInterface[]> {
        return of(this.categories).pipe(
            map((categories: CategoryInterface[]) =>
                categories.filter(
                    (category: CategoryInterface) => category.transactionType === TransactionTypeEnum.EXPENSE
                )
            )
        );
    }

    public edit(category: CategoryInterface, parentId?: string): Observable<CategoryInterface> {
        if (parentId) {
            const parentCategory = this.categories.find((c) => c.id === parentId);
            if (parentCategory) {
                const index = parentCategory.subcategories?.findIndex((c) => c.id === category.id);
                parentCategory.subcategories?.splice(index as number, 1, category);
            }
        } else {
            const index = this.categories.findIndex((c) => c.id === category.id);
            this.categories[index] = category;
        }
        return of(category);
    }

    public delete(id: string, parentId?: string): Observable<null> {
        if (parentId) {
            const parentCategory = this.categories.find((c) => c.id === parentId);
            if (parentCategory) {
                const index = parentCategory.subcategories?.findIndex((c) => c.id === id);
                parentCategory.subcategories?.splice(index as number, 1);
            }
        } else {
            const index = this.categories.findIndex((c) => c.id === id);
            this.categories.splice(index, 1);
        }

        return of(null);
    }

    public isNameUnique(name: string): Observable<boolean> {
        const checkedCategories = this.categories.some((category) => category.name === name);
        const checkedSubcategories = this.categories.some((category) => {
            return category.subcategories && category.subcategories.some((subcategory) => subcategory.name === name);
        });
        return of(checkedCategories || checkedSubcategories);
    }

    private generateId(): string {
        return Math.random().toString();
    }
}
