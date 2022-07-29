import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditTransactionFormComponent } from '@modules/main-page';

@Component({
    selector: 'app-transaction-dialog',
    templateUrl: './transaction-dialog.component.html',
    styleUrls: ['./transaction-dialog.component.scss'],
})
export class TransactionDialogComponent {
    public dataForm!: FormGroup;

    @ViewChild('transactionForm') transactionForm!: AddEditTransactionFormComponent;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
