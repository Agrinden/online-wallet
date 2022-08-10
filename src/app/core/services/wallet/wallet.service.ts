import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CoreModule } from '@core/core.module';
import { mockWallets, WALLETS } from '@app/mocks';
import { WalletInterface, IncomeWalletInterface, CreateWalletInterface } from '@app/shared';

@Injectable({
    providedIn: CoreModule,
})
export class WalletService {
    public createWallet(wallet: CreateWalletInterface): Observable<any> {
        return of(wallet);
    }

    public getWalletList(): Observable<IncomeWalletInterface[]> {
        return WALLETS;
    }

    public getWallet(walletId: string): Observable<WalletInterface | null> {
        return of(mockWallets.find(({ id }) => id === walletId) ?? null);
    }

    public getWallets(): Observable<WalletInterface[]> {
        return of(mockWallets);
    }

    public delete(id: string): Observable<boolean> {
        mockWallets.splice(
            mockWallets.findIndex((wallet) => wallet.id === id),
            1
        );
        return of(true);
    }
}
