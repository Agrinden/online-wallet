import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { WalletsStoreService } from '@core';

@Injectable({ providedIn: 'root' })
export class WalletNameExistsValidator implements AsyncValidator {
    constructor(private walletStoreService: WalletsStoreService) {}

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const name = control.get('name')?.value;
        const currency = control.get('currency')?.value;
        return this.walletStoreService.wallets$.pipe(
            map((wallets) => {
                return wallets.find((wallet) => wallet.name === name && wallet.currency === currency)
                    ? { uniqueWallet: true }
                    : null;
            }),
            catchError((error) => {
                return of(error);
            })
        );
    }
}
