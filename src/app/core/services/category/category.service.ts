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

    public create(category: CategoryTemplateInterface) {
        if (category.transactionType === TransactionTypeEnum.EXPENSE) {
            this.categories.push({
                ...category,
                id: this.generateId(),
                subcategories: [],
            });
        } else {
            this.categories.push({
                ...category,
                id: this.generateId(),
            });
        }
    }

    public get(): Observable<CategoryInterface[]> {
        return of(this.categories);
    }

    public edit(category: CategoryInterface) {
        const index = this.categories.findIndex((c) => c.id === category.id);
        this.categories[index] = category;
    }

    public delete(id: string) {
        const index = this.categories.findIndex((c) => c.id === id);
        this.categories.splice(index, 1);
    }

    public isNameUnique(name: string): Observable<boolean> {
        return of(this.categories.every((c) => c.name !== name && c.subcategories?.every((sc) => sc.name !== name)));
    }

    public createSubcategory(subcategory: CategoryTemplateInterface) {
        const parentCategory = this.categories.find((c) => c.id === subcategory.parentId);
        if (parentCategory) {
            parentCategory.subcategories?.push({ ...subcategory, id: this.generateId() });
        }
    }

    public deleteSubcategory(parentId: string, id: string) {
        const parentCategory = this.categories.find((c) => c.id === parentId);
        if (parentCategory) {
            const index = parentCategory.subcategories?.findIndex((c) => c.id === id);
            parentCategory.subcategories?.splice(index as number, 1);
        }
    }
    public editSubcategory(parentId: string, subcategory: CategoryInterface) {
        const parentCategory = this.categories.find((c) => c.id === parentId);
        if (parentCategory) {
            const index = parentCategory.subcategories?.findIndex((c) => c.id === subcategory.id);
            parentCategory.subcategories?.splice(index as number, 1, subcategory);
        }
    }

    private generateId(): string {
        return Math.random().toString();
    }
}
