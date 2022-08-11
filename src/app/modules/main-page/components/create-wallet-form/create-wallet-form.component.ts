import { Subject, takeUntil } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CurrencyInterface } from '@app/shared/interfaces/currency.interface';
import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { isWalletDefaultMessage } from '@core';

@Component({
    selector: 'app-create-wallet-form',
    templateUrl: './create-wallet-form.component.html',
    styleUrls: ['./create-wallet-form.component.scss'],
})
export class CreateWalletFormComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();
    form: FormGroup = new FormGroup({});

    constructor(private formBuilder: FormBuilder, private dialogService: DialogService) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
            currency: [null, [Validators.required]],
            isDefault: [false],
        });
    }

    public onCurrencyChange(event: CurrencyInterface): void {
        this.form.get('currency')?.setValue(event.name);
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
