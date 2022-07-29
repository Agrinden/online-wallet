import { Injectable } from '@angular/core';
import { CoreModule } from '@app/core';
import { HttpTransactionService } from '@core/services';
import { categories$, WALLETS } from '@app/mocks';
import { IncomeWalletInterface, TransactionInterface } from '@app/shared';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: CoreModule,
})
export class TransactionService {
    public categories$ = categories$;
    public wallets$ = WALLETS;

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
