import { CoreModule } from '@core/core.module';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: CoreModule,
})
export class WalletService {
    constructor() {}

    public createWallet() {}
}
