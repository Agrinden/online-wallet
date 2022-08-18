import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, map, Observable } from 'rxjs';

import { CreateWalletFormComponent } from '@modules/main-page';
import { DialogService } from '@shared/dialog/services/dialog.service';
import { WalletNameExistsValidator } from '@app/shared';
import { DialogDataInterface } from '@shared/interfaces/dialog-data.interface';
import { Wallet } from '@shared/models/wallet';
import { CURRENCIES } from '@app/mocks';

@Component({
    selector: 'app-edit-wallet-form',
    templateUrl: './edit-wallet-form.component.html',
    styleUrls: ['./edit-wallet-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditWalletFormComponent extends CreateWalletFormComponent implements OnInit {
    public wallet!: Wallet;
    public isCurrencyDisabled$!: Observable<boolean>;
    public readonly currencyFilterCtrl: FormControl = new FormControl('');
    public readonly currencies: string[] = CURRENCIES;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly data: DialogDataInterface<Wallet>,
        override readonly formBuilder: FormBuilder,
        override readonly dialogService: DialogService,
        override readonly walletValidator: WalletNameExistsValidator
    ) {
        super(formBuilder, dialogService, walletValidator);
    }
    override ngOnInit(): void {
        if (!this.data.contentData) {
            return;
        }

        this.wallet = this.data.contentData;
        this.isCurrencyDisabled$ = this.wallet.recentTransactions$.pipe(map((transactions) => transactions.length > 0));

        this.form = this.formBuilder.group(
            {
                name: [this.wallet.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
                currency: [this.wallet.currency, [Validators.required]],
                isDefault: [this.wallet.isDefault],
            },
            {
                asyncValidators: [
                    (control) =>
                        this.walletValidator.validate(control).pipe(
                            filter(() => {
                                const name = control.get('name')?.value;
                                return name !== this.wallet.name;
                            })
                        ),
                ],
                updateOn: 'blur',
            }
        );
    }
}
