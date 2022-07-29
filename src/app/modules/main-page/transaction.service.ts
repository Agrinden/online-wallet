import { Injectable } from '@angular/core';
import { CoreModule } from '@app/core';
import { HttpTransactionService } from '@app/core/services/http-transaction/http-transaction.service';
import { CATEGORIES, WALLETS } from '@app/mocks';
import { CategoryInterface, TransactionInterface, WalletInterface } from '@app/shared';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { MainPageModule } from '.';

@Injectable({
    providedIn: CoreModule,
})
export class TransactionService {
    public categories$ = CATEGORIES;
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
}
