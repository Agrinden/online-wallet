import { Observable, of } from 'rxjs';
import { CreateWalletInterface } from '@app/shared/interfaces/create-wallet.interface';
import { Injectable } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { WalletInterface } from '@shared/interfaces/wallet.interface';
import { mockWallets } from '@app/mocks';

@Injectable({
    providedIn: CoreModule,
})
export class WalletService {
    constructor() {}

    public createWallet(wallet: CreateWalletInterface): Observable<any> {
        return of(wallet);
    }

    public getWallets(): Observable<WalletInterface[]> {
        return of(mockWallets);
    }
}
