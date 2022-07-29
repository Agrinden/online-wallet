import { CoreModule } from '@core/core.module';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: CoreModule,
})
export class WalletService {
    constructor() {}

    public createWallet(wallet: CreateWalletInterface): Observable<any> {
        return of(wallet);
    }

    public getWallet(id: string): Observable<WalletInterface> {
        return of(mockWallets[0]);
    }

    public getWalletTransactions(
        id: string,
        from: number,
        numberOfTransactions: number
    ): Observable<TransactionInterface[]> {
        return of(mockWalletTransactions.slice(from, from + numberOfTransactions));
    }
}
