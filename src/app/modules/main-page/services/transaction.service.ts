import { EXPENSE_DATA } from './../../../mocks/expense-table';
import { Injectable } from '@angular/core';
import { CoreModule } from '@app/core';
import { categories } from '@core/constants';
import { TransactionInterface } from '@app/shared';
import { CategoryInterface } from '@app/shared';
import { HttpTransactionService } from '@core/services';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    public categories$: Observable<CategoryInterface[]> = of(categories);

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
