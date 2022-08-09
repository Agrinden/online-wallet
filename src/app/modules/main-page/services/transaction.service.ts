import { EXPENSE_DATA } from './../../../mocks/expense-table';
import { Injectable } from '@angular/core';
import { CATEGORIES, CoreModule } from '@app/core';
import { categories } from '@core/constants';
import { CategoryInterface, TransactionInterface } from '@app/shared';

import { HttpTransactionService } from '@core/services';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    public categories$: Observable<CategoryInterface[]> = of(CATEGORIES);

    constructor(private httpService: HttpTransactionService) {}

    public get(formData: any): Observable<TransactionInterface> {
        // return this.httpService.getTransaction(formData.id);
        return of(EXPENSE_DATA.filter((data) => data.id === formData)[0]);
    }

    public create(formData: any): Observable<TransactionInterface> {
        return this.httpService.postTransaction(formData);
    }

    public edit(formData: any): Observable<TransactionInterface> {
        return this.httpService.updateTransaction(formData);
    }
}
