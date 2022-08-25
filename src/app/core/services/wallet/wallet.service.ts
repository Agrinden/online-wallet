import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CoreModule } from '@core/core.module';
import { WalletInterface, CreateWalletInterface } from '@app/shared';
import { HttpClient } from '@angular/common/http';
import {WALLETS} from '@app/mocks';

@Injectable({
    providedIn: CoreModule,
})
export class WalletService {
    constructor(private http: HttpClient) {}

    public getMockWallets(): Observable<WalletInterface[]> {
        return WALLETS;
    }

    public createWallet(wallet: CreateWalletInterface): Observable<string> {
        return this.http.post<string>(`${environment.apiUrl}/wallets`, wallet);
    }

    public getWallet(id: number): Observable<WalletInterface | null> {
        return this.http.get<WalletInterface>(`${environment.apiUrl}/wallets/${id}`);
    }

    public getWallets(): Observable<WalletInterface[]> {
        return this.http.get<WalletInterface[]>(`${environment.apiUrl}/wallets`);
    }

    public delete(id: number): Observable<null> {
        return this.http.delete<null>(`${environment.apiUrl}/wallets/${id}`);
    }

    public edit(id: number, wallet: CreateWalletInterface): Observable<WalletInterface> {
        return this.http.put<WalletInterface>(`${environment.apiUrl}/wallets/${id}`, wallet);
    }
}
