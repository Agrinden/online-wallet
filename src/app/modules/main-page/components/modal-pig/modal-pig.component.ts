import { WalletService } from '@core';
import { WalletInterface } from './../../../../shared/interfaces/wallet.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { tap } from 'rxjs';

@Component({
    selector: 'app-modal-pig',
    templateUrl: './modal-pig.component.html',
    styleUrls: ['./modal-pig.component.scss'],
})
export class ModalPigComponent implements OnInit {
    public pigForm!: FormGroup;
    public wallets: WalletInterface[] = [];
    public currency: string | undefined;

    private amountValidators = [Validators.required, Validators.pattern(/^[0-9]*[.,]?[0-9]+$/)];

    constructor(private formBuilder: FormBuilder, private walletService: WalletService) {}

    ngOnInit(): void {
        this.walletService
            .getWallets()
            .pipe(
                tap((wallets) => {
                    const defaultWallet = wallets[0];
                    this.wallets = wallets;
                    this.currency = defaultWallet.currency;
                    this.pigForm = this.getInitializedForm(defaultWallet);
                })
            )
            .subscribe(() => this.walletChangesHandler());
    }

    private walletChangesHandler(): void {
        this.pigForm.get('wallet')?.valueChanges.subscribe((walletId) => {
            const currentWallet = this.wallets.find((wallet) => wallet.id === walletId);
            if (currentWallet) {
                this.currency = currentWallet.currency;
                this.pigForm
                    .get('amount')
                    ?.setValidators([...this.amountValidators, Validators.max(currentWallet.balance)]);
                this.pigForm.updateValueAndValidity();
            }
        });
    }

    private getInitializedForm(wallet: WalletInterface): FormGroup {
        const form = this.formBuilder.group({
            wallet: wallet.id,
            amount: [null, [...this.amountValidators, Validators.max(wallet.balance)]],
        });
        return form;
    }
}
