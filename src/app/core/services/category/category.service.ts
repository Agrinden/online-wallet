import { CoreModule } from '@core/core.module';
import { Injectable } from '@angular/core';
import { CategoryInterface, CategoryTemplateInterface } from '@app/shared';
import { Observable, of } from 'rxjs';
import { CATEGORIES } from '@app/mocks';

@Injectable({
    providedIn: CoreModule,
})
export class CategoryService {
    private categories: CategoryInterface[] = CATEGORIES;

    public create(category: CategoryTemplateInterface) {
        const newCategory = { ...category, id: Math.random().toString() };
        return this.categories.push(newCategory);
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
        return of(this.categories.every((c) => c.name !== name));
    }
}
