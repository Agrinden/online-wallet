import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WarningDialogService, IncomeDataService } from '@app/core';
import { closeWarning } from '@app/core/services/user-delete/user-delete-constants';
import { TransactionFormInterface, TransactionDTOInterface } from '@app/shared';
import { ConfirmationDialogChoise } from '@app/shared/enums/dialog-enums';
import { AddEditTransactionFormComponent } from '@modules/main-page';
import { filter, Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';

@Component({
    selector: 'app-transaction-dialog',
    templateUrl: './transaction-dialog.component.html',
    styleUrls: ['./transaction-dialog.component.scss'],
})
export class TransactionDialogComponent {
    private destroy$ = new Subject();

    @ViewChild('transactionForm') transactionForm!: AddEditTransactionFormComponent;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog,
        private warnDialogService: WarningDialogService,
        private incomeDataService: IncomeDataService
    ) {}

    public formIsChanged(form: any): boolean {
        return form.dataForm.dirty || form.dataForm.touched;
    }

    public openConfirmationDialog(): void {
        if (this.formIsChanged(this.transactionForm)) {
            this.warnDialogService
                .open(closeWarning)
                .pipe(
                    filter((value) => value === ConfirmationDialogChoise.confirm),
                    takeUntil(this.destroy$)
                )
                .subscribe(() => {
                    this.dialog.closeAll();
                });
            const form = this.transactionForm.data as TransactionFormInterface;
            const formData: TransactionDTOInterface = {
                amount: String(form.amount),
                category: {
                    id: Number(form.category.value?.id),
                    categoryType: String(form.category.value?.transactionType),
                    color: '',
                    name: '',
                },
                date: moment(form.date.value).format('YYYY-MM-DD'),
                notes: String(form.note.value),
                payer: '',
                subcategory: '',
                transactionType: String(form.category.value?.transactionType),
                walletId: Number(form.wallet.value),
            };
            this.incomeDataService.edit(formData, String(form.id.value)).subscribe();
        } else this.dialog.closeAll();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
