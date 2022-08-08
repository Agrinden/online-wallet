import { Injectable } from '@angular/core';
import { CATEGORIES, CoreModule } from '@app/core';
import { categories } from '@core/constants';
import { CategoryInterface, TransactionInterface } from '@app/shared';

import { HttpTransactionService } from '@core/services';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: CoreModule,
})
export class TransactionService {
    public categories$: Observable<CategoryInterface[]> = of(CATEGORIES);

    constructor(private httpService: HttpTransactionService) {}

    public get(formData: any): Observable<TransactionInterface> {
        return this.httpService.getTransaction(formData.id);
    }

    public create(formData: any): Observable<TransactionInterface> {
        return this.httpService.postTransaction(formData);
    }

    public edit(formData: any): Observable<TransactionInterface> {
        return this.httpService.updateTransaction(formData);
    }
}
