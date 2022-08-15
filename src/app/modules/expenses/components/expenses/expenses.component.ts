import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { TransactionDialogComponent } from '@modules/main-page';
import { MatDialog } from '@angular/material/dialog';
import { EXPENSE_DATA } from './../../../../mocks/expense-table';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
    public tableTypes = TransactionTypeEnum;
    public expenses = EXPENSE_DATA;
    public isDataDisable!: boolean;

    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {
        this.isDataDisable = EXPENSE_DATA.length === 0;
    }

    public onAddTransactionClick(): void {
        this.dialog.open(TransactionDialogComponent, {
            data: { isEditForm: false, itemType: TransactionTypeEnum.EXPENSE },
            disableClose: true,
        });
    }
}
