import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoreModule } from '@core/core.module';
import { mockWalletTransactions } from '@app/mocks';
import { TransactionInterface } from '@app/shared';

@Injectable({
    providedIn: CoreModule,
})
export class WalletTransactionsService {
    constructor(private readonly datePipe: DatePipe) {}

    public get(id: number, from: number, quantity: number): Observable<TransactionInterface[]> {
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
