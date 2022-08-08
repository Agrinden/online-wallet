import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoreModule } from '@core/core.module';
import { mockWallets, mockWalletTransactions, WALLETS } from '@app/mocks';
import { TransactionInterface, WalletInterface, IncomeWalletInterface, CreateWalletInterface } from '@app/shared';

@Injectable({
    providedIn: CoreModule,
})
export class WalletService {
    constructor(private readonly datePipe: DatePipe) {}

    public createWallet(wallet: CreateWalletInterface): Observable<any> {
        return of(wallet);
    }

    public getWalletList(): Observable<IncomeWalletInterface[]> {
        return WALLETS;
    }

    public getWallet(walletId: string): Observable<WalletInterface | null> {
        return of(mockWallets.find(({ id }) => id === walletId) ?? null);
    }

    public getWalletTransactions(id: string, from: number, quantity: number): Observable<TransactionInterface[]> {
        return of(mockWalletTransactions.slice(from, from + quantity)).pipe(
            map((walletTransactions) => {
                return walletTransactions.map((transaction) => ({
                    ...transaction,
                    date: String(this.datePipe.transform(transaction.date, 'dd.MM.YYYY')),
                }));
            })
        );
    }
}
