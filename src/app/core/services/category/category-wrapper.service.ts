import { ActivatedRoute, Router } from '@angular/router';
import { CategoryMockService } from './category-mock.service';
import { CategoryApiService } from '@app/core/services/category/category-api.service';
import { Injectable } from '@angular/core';
import { CategoryService } from './category-service.abstract';
import { CategoryInterface, CategoryTemplateInterface } from '@app/shared';
import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { Observable, of } from 'rxjs';
import { CATEGORIES } from '@app/mocks';

@Injectable({
    providedIn: 'root',
})
export class CategoryWrapperService extends CategoryService {
    private service: CategoryService;

    constructor(
        private categoryApiService: CategoryApiService,
        private categoryMockService: CategoryMockService,
        private router: ActivatedRoute
    ) {
        super();
        this.service = this.categoryApiService;
        this.router.queryParams.subscribe((params) => {
            this.service = params['useCategoriesMock'] ? this.categoryMockService : this.categoryApiService;
        });
    }

    getCategories(): Observable<CategoryInterface[]> {
        return of(CATEGORIES);
    }

    getIncomes() {
        return this.service.getIncomes();
    }

    getExpenses() {
        return this.service.getExpenses();
    }

    create(category: CategoryTemplateInterface, type: TransactionTypeEnum, parentId?: string | undefined) {
        return this.service.create(category, type, parentId);
    }

    edit(category: CategoryInterface, parentId?: string | undefined) {
        return this.service.edit(category, parentId);
    }
    delete(id: string, parentId?: string | undefined) {
        return this.service.delete(id, parentId);
    }
    isNameUnique(name: string) {
        return this.service.isNameUnique(name);
    }
}
