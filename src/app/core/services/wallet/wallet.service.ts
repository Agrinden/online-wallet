import { Observable, of } from 'rxjs';
import { CreateWalletInterface } from '@app/shared/interfaces/create-wallet.interface';
import { Injectable } from '@angular/core';
import { CoreModule } from '@app/core/core.module';

@Injectable({
    providedIn: CoreModule,
})
export class WalletService {
    constructor() {}

    public createWallet(wallet: CreateWalletInterface): Observable<any> {
        return of(wallet);
    }
}
