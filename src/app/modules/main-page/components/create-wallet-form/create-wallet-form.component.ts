import { Subject, takeUntil } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { isWalletDefaultMessage } from '@core';
import { WalletNameExistsValidator } from '@app/shared/helpers/wallet-name.validator';

@Component({
    selector: 'app-create-wallet-form',
    templateUrl: './create-wallet-form.component.html',
    styleUrls: ['./create-wallet-form.component.scss'],
})
export class CreateWalletFormComponent implements OnInit, OnDestroy, AfterViewInit {
    destroy$: Subject<boolean> = new Subject<boolean>();
    form: FormGroup = new FormGroup({});
    public nameErrorMessage!: string;

    constructor(
        protected formBuilder: FormBuilder,
        protected dialogService: DialogService,
        protected walletValidator: WalletNameExistsValidator
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group(
            {
                name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
                currency: [null, [Validators.required]],
                isDefault: [false],
            },
            {
                asyncValidators: [this.walletValidator.validate.bind(this.walletValidator)],
                updateOn: 'blur',
            }
        );
    }

    public get name(): AbstractControl | null {
        return this.form.get('name');
    }

    ngAfterViewInit(): void {
        this.name?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.nameErrorMessage = this.getErrorMessage();
        });
    }

    private getErrorMessage(): string {
        if (this.name?.hasError('required')) {
            return 'Please fill in the name of wallet';
        }

        if (this.name?.hasError('minlength')) {
            return 'Name must contain at least 3 characters';
        }

        return this.name?.hasError('maxlength') ? 'Name must contain at most 30 characters' : '';
    }

    public onCurrencyChange(currency: string): void {
        this.form.get('currency')?.setValue(currency);
    }

    public onCancel(): void {
        this.form.reset();
    }

    private openSlideToggleModal(): void {
        const options = {
            title: isWalletDefaultMessage,
            cancelText: 'CANCEL',
            confirmText: 'OK',
            width: '700px',
        };

        const dialog = this.dialogService.open(options);

        this.dialogService
            .confirmed(dialog)
            .pipe(takeUntil(this.destroy$))
            .subscribe((result) => {
                return result
                    ? this.form.get('isDefault')?.setValue(true)
                    : this.form.get('isDefault')?.setValue(false);
            });
    }

    public onSlideToggle(event: MatSlideToggleChange): void {
        if (event.checked) {
            this.openSlideToggleModal();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
