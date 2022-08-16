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

    public isUnique(name: string, currency: string): Observable<boolean> {
        return of(mockWallets.every((c) => c.name !== name || c.currency !== currency));
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

    public edit(id: string, wallet: CreateWalletInterface): Observable<WalletInterface> {
        const walletIndex = mockWallets.findIndex((w) => w.id === id);
        const previousWallet = mockWallets[walletIndex];
        const editedWallet = {
            ...previousWallet,
            name: wallet.name,
            currency: wallet.currency,
            isDefault: wallet.isDefault,
        };

        mockWallets.splice(walletIndex, 1);
        mockWallets.push(editedWallet);

        return of(editedWallet);
    }
}
