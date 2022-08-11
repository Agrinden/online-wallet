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
        return this.walletService.isUnique(name, currency).pipe(
            map((isTaken) => (isTaken ? null : { uniqueWallet: true })),
            catchError(() => of(null))
        );
    }
}
