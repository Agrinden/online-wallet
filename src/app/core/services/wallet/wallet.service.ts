import { IncomeWalletInterface } from './../../../shared/interfaces/income-wallet.interface';
import { Observable, of } from 'rxjs';
import { CreateWalletInterface } from '@app/shared/interfaces/create-wallet.interface';
import { Injectable } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { WALLETS } from '../../../mocks/wallets';

@Injectable({
    providedIn: CoreModule,
})
export class WalletService {
    constructor() {}

    public createWallet(wallet: CreateWalletInterface): Observable<any> {
        return of(wallet);
    }

    public getWalletList(): Observable<IncomeWalletInterface[]> {
        return of(WALLETS);
    }
}
