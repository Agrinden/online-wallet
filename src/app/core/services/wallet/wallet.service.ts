import { IncomeWalletInterface } from './../../../shared/interfaces/income-wallet.interface';
import { Observable, of } from 'rxjs';
import { CreateWalletInterface } from '@app/shared/interfaces/create-wallet.interface';
import { CoreModule } from '@core/core.module';
import { Injectable } from '@angular/core';
import { WALLETS } from '../../../mocks/wallets';
import { TransactionInterface, WalletInterface } from '@app/shared';
import { Observable, of } from 'rxjs';
import { CreateWalletInterface } from '@shared/interfaces/create-wallet.interface';
import { mockWallets, mockWalletTransactions } from '@app/mocks';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: CoreModule,
})
export class WalletService {
    constructor(private readonly datePipe: DatePipe) {}

    public createWallet(wallet: CreateWalletInterface): Observable<any> {
        return of(wallet);
    }

    public getWalletList(): Observable<IncomeWalletInterface[]> {
        return of(WALLETS);
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
