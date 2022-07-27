import { Injectable } from '@angular/core';
import { mockWallets, mockWalletTransactions } from '@core';
import { CoreModule } from '@core/core.module';
import { Observable, of } from 'rxjs';
import { TransactionInterface, WalletInterface } from '@app/shared';

@Injectable({
    providedIn: CoreModule,
})
export class WalletService {
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
