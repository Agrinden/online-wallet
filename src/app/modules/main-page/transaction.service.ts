import { Injectable } from '@angular/core';
import { HttpTransactionService } from '@app/core/services/http-transaction/http-transaction.service';
import { CATEGORIES, WALLETS } from '@app/mocks';
import { CategoryInterface, ITransactionInterface, WalletInterface } from '@app/shared';
import { Observable, of, Subject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    public currentTransactionSubject$ = new Subject();

    public currentTransaction$ = this.currentTransactionSubject$.asObservable();

    public categories$ = CATEGORIES;
    public wallets$ = WALLETS;

    constructor(private httpService: HttpTransactionService) {}

    public createTransaction({ itemType }: any): Subscription {
        return this.httpService
            .postTransaction({ itemType })
            .subscribe((value) => this.currentTransactionSubject$.next(value));
    }

    public editTransaction({ itemType, itemId }: any): Subscription {
        return this.httpService
            .updateTransaction({ itemType, itemId })
            .subscribe((value) => this.currentTransactionSubject$.next(value));
    }

    public getTransactionList(type: string): Observable<ITransactionInterface[]> {
        return of();
    }

    public getCategoryList(): Observable<CategoryInterface[]> {
        return of();
    }
    public getWalletList(): Observable<WalletInterface[]> {
        return of();
    }
}
