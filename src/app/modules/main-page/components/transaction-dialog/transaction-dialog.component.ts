import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { closeWarning } from '@app/core/services/user-delete/user-delete-constants';
import { WarningDialogService } from '@app/core/services/warn-dialog/warning-dialog.service';
import { AddEditTransactionFormComponent } from '@modules/main-page';

@Component({
    selector: 'app-transaction-dialog',
    templateUrl: './transaction-dialog.component.html',
    styleUrls: ['./transaction-dialog.component.scss'],
})
export class TransactionDialogComponent {
    public dataForm!: FormGroup;

    @ViewChild('transactionForm') transactionForm!: AddEditTransactionFormComponent;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private warnService: WarningDialogService) {}

    public onCloseDialog() {
        this.warnService.invokeWarnDialog(closeWarning);
    }
}
