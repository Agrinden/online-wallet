import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CoreModule } from '@core/core.module';
import { WALLETS } from '@app/mocks';
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

    public getWallet(id: string): Observable<WalletInterface | null> {
        return this.http.get<WalletInterface>(`${environment.apiUrl}/wallets/${id}`);
    }

    public getWallets(): Observable<WalletInterface[]> {
        return this.http.get<WalletInterface[]>(`${environment.apiUrl}/wallets`);
    }

    public delete(id: string): Observable<null> {
        return this.http.delete<null>(`${environment.apiUrl}/wallets/${id}`);
    }

    public edit(id: string, wallet: CreateWalletInterface): Observable<WalletInterface> {
        return this.http.put<WalletInterface>(`${environment.apiUrl}/wallets/${id}`, wallet);
    }
}
