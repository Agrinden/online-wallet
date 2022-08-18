import { TransactionService } from '@modules/main-page';
import { ConfirmationDialogChoise } from '@shared/enums/dialog-enums';
import { filter, takeUntil, Subject } from 'rxjs';
import { closeWarning } from './../../../../core/services/user-delete/user-delete-constants';
import { WarningDialogService } from './../../../../core/services/warn-dialog/warning-dialog.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CURRENCIES } from '@app/mocks';
import { CurrencyInterface } from './../../../../shared/interfaces/currency.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-modal-pig',
    templateUrl: './modal-pig.component.html',
    styleUrls: ['./modal-pig.component.scss'],
})
export class ModalPigComponent implements OnInit, OnDestroy {
    @Input() dataForm!: any;

    public pigForm!: FormGroup;
    public currencyTitle: CurrencyInterface[] = CURRENCIES;
    private destroy$ = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: CurrencyInterface,
        private warnDialogService: WarningDialogService,
        private dialog: MatDialog,
        private transactionService: TransactionService
    ) {}

    ngOnInit(): void {
        this.pigForm = this.getInitializedForm(this.data);
    }

    public formIsChanged(): boolean {
        return this.pigForm.dirty || this.pigForm.touched;
    }

    public openConfirmationDialog(): void {
        if (this.formIsChanged()) {
            this.warnDialogService
                .open(closeWarning)
                .pipe(
                    filter((value) => value === ConfirmationDialogChoise.confirm),
                    takeUntil(this.destroy$)
                )
                .subscribe(() => this.dialog.closeAll());
        } else {
            this.dialog.closeAll();
        }
    }

    //TODO request to BE
    public onSave() {
        if (this.pigForm) {
            const formControls = this.pigForm.getRawValue();
        }
    }

    private getInitializedForm(formData: CurrencyInterface): FormGroup {
        const form = this.formBuilder.group({
            saving: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]{1,30}$/)]],
            currency: [formData.name, Validators.required],
            amount: [null, Validators.pattern(/^\d+(\.\d{2})?$/)],
        });
        return form;
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
