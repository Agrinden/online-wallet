import { CoreModule } from '@core/core.module';
import { Injectable } from '@angular/core';
import { CategoryInterface, CreateCategoryInterface } from '@app/shared';
import { Observable, of } from 'rxjs';
import { CATEGORIES } from '@app/mocks';

@Injectable({
    providedIn: CoreModule,
})
export class CategoryService {
    categories: CategoryInterface[] = CATEGORIES;
    constructor() {}

    createCategory(category: CreateCategoryInterface) {
        const newCategory = { ...category, id: Math.random().toString() };
        return this.categories.push(newCategory);
    }

    getCategories(): Observable<CategoryInterface[]> {
        return of(this.categories);
    }

    editCategory(category: CategoryInterface) {
        const index = this.categories.findIndex((c) => c.id === category.id);
        this.categories[index] = category;
    }

    deleteCategory(id: string) {
        const index = this.categories.findIndex((c) => c.id === id);
        this.categories.splice(index, 1);
    }
}
