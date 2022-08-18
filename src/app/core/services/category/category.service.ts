import { CoreModule } from '@core/core.module';
import { Injectable } from '@angular/core';
import { CategoryInterface, CategoryTemplateInterface } from '@app/shared';
import { Observable, of } from 'rxjs';
import { CATEGORIES } from '@app/mocks';
import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';

@Injectable({
    providedIn: CoreModule,
})
export class CategoryService {
    private categories: CategoryInterface[] = CATEGORIES;

    public create(category: CategoryTemplateInterface, type: TransactionTypeEnum, parentId?: string): void {
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
    }

    public get(): Observable<CategoryInterface[]> {
        return of(this.categories);
    }

    public edit(category: CategoryInterface, parentId?: string): void {
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
    }

    public delete(id: string, parentId?: string): void {
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
    }

    public isNameUnique(name: string): Observable<boolean> {
        return of(this.categories.every((c) => c.name !== name));
    }

    private generateId(): string {
        return Math.random().toString();
    }
}
