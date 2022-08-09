import { TransactionDialogComponent } from '@modules/main-page';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TransactionType } from '@core';
import { INCOME_DATA } from './../../../../mocks/table';
import { EXPENSE_DATA } from './../../../../mocks/expense-table';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent {
    public tableTypes = TransactionType;
    public expenses = EXPENSE_DATA;

    constructor(private dialog: MatDialog) {}

    public onAddTransactionClick(): void {
        this.dialog.open(TransactionDialogComponent, {
            data: { isEditForm: false, itemType: TransactionType.expense },
            disableClose: true,
        });
    }
}
