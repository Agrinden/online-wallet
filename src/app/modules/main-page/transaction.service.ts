import { Injectable } from '@angular/core';
import { HttpTransactionService } from '@app/core/services/http-transaction/http-transaction.service';
import { CATEGORIES, WALLETS } from '@app/mocks';
import { ICategory, ITransaction, IWallet } from '@app/shared';
import { Observable, of, Subject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    public currentTransactionSubject$ = new Subject();

    public categories$ = CATEGORIES;
    public wallets$ = WALLETS;

    constructor(private httpService: HttpTransactionService) {}

    public createTransaction({ itemType }: any): Subscription {
        return this.httpService
            .postTransaction({ itemType })
            .subscribe({ next: (value) => this.currentTransactionSubject$.next(value) });
    }

    public updateTransaction({ itemType, itemId }: any): Observable<any> {
        return of();
    }

    public getCategoryList(): Observable<ICategory[]> {
        return of();
    }
    public getWalletList(): Observable<IWallet[]> {
        return of();
    }

    public getTransactionList(type: string): Observable<ITransaction[]> {
        return of();
    }
}
