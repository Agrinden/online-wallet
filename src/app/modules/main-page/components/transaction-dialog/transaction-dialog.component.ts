import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WarningDialogService } from '@app/core';
import { closeWarning } from '@app/core/services/user-delete/user-delete-constants';
import { ConfirmationDialogChoise } from '@app/shared/enums/dialog-enums';
import { AddEditTransactionFormComponent } from '@modules/main-page';
import { filter, Subject, takeUntil } from 'rxjs';

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
        private warnDialogService: WarningDialogService
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
                .subscribe(() => this.dialog.closeAll());
        } else {
            this.dialog.closeAll();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
