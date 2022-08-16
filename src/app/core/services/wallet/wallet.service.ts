import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { CoreModule } from '@core/core.module';
import { mockWallets, WALLETS } from '@app/mocks';
import { WalletInterface, IncomeWalletInterface, CreateWalletInterface } from '@app/shared';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: CoreModule,
})
export class WalletService {
    constructor(private http: HttpClient) {}

    public createWallet(wallet: CreateWalletInterface): Observable<WalletInterface> {
        return this.http.post<WalletInterface>(`${environment.apiUrl}/wallets`, wallet);
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
        return this.http.get<WalletInterface[]>(`${environment.apiUrl}/wallets`);
    }

    public delete(id: string): Observable<boolean> {
        mockWallets.splice(
            mockWallets.findIndex((wallet) => wallet.id === id),
            1
        );
        return of(true);
    }
}
