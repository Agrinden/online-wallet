import { Injectable } from '@angular/core';
import { CoreModule } from '@app/core';
import { categories$, payers$, WALLETS } from '@app/mocks';
import { IncomeWalletInterface, TransactionInterface } from '@app/shared';
import { ICategoryInterface } from '@app/shared/interfaces/category';
import { HttpTransactionService } from '@core/services';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: CoreModule,
})
export class TransactionService {
    public categories$: Observable<ICategoryInterface[]> = categories$;
    public wallets$: Observable<any> = WALLETS;
    public payers$: Observable<any> = payers$;

    constructor(private httpService: HttpTransactionService) {}

    public getTransaction(formData: any): Observable<TransactionInterface> {
        return this.httpService.getTransaction(formData.id);
    }

    public createTransaction(formData: any): Observable<TransactionInterface> {
        return this.httpService.postTransaction(formData);
    }

    public editTransaction(formData: any): Observable<TransactionInterface> {
        return this.httpService.updateTransaction(formData);
    }

    public getWalletList(): Observable<IncomeWalletInterface[]> {
        return WALLETS;
    }

    public getIncomeCategories(): Observable<any> {
        return categories$;
    }
}
