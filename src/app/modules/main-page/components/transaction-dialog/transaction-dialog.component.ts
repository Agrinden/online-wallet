import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { closeWarning } from '@app/core/services/user-delete/user-delete-constants';
import { WarningDialogService } from '@app/core/services/warn-dialog/warning-dialog.service';
import { AddEditTransactionFormComponent } from '@modules/main-page';

@Component({
    selector: 'app-transaction-dialog',
    templateUrl: './transaction-dialog.component.html',
    styleUrls: ['./transaction-dialog.component.scss'],
})
export class TransactionDialogComponent {
    @ViewChild('transactionForm') transactionForm!: AddEditTransactionFormComponent;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private warnService: WarningDialogService,
        private dialog: MatDialog
    ) {}

    public onCloseDialog() {
        const ref = this.warnService.callWarnDialog(closeWarning);

        if (this.transactionForm.dataForm.dirty || this.transactionForm.dataForm.touched) {
            console.log('dirty');
            ref.subscribe(() => this.dialog.closeAll());
        } else this.dialog.closeAll();
    }
}
