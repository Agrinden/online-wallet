import { Injectable } from '@angular/core';
import { CoreModule } from '@app/core';
import { categories } from '@core/constants';
import { TransactionInterface } from '@app/shared';
import { CategoryInterface } from '@app/shared/interfaces/category';
import { HttpTransactionService } from '@core/services';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: CoreModule,
})
export class TransactionService {
    public categories$: Observable<CategoryInterface[]> = of(categories);

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
