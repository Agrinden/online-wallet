import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { WalletService } from '@app/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WalletNameExistsValidator implements AsyncValidator {
    constructor(private walletService: WalletService) {}

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        const name = control.get('name')?.value;
        const currency = control.get('currency')?.value;
        return this.walletService.getWallets().pipe(
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
