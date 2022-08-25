import { IncomeDataService } from '@app/core';
import { TransactionInterface } from '@app/shared';
import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { TransactionDialogComponent } from '@modules/main-page';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent {
    public tableTypes = TransactionTypeEnum;
    public expenses: TransactionInterface[] = [];

    constructor(private dialog: MatDialog, private incomeDataService: IncomeDataService) {}

    ngOnInit(): void {
        this.incomeDataService
            .get(TransactionTypeEnum.EXPENSE)
            .subscribe((tableData) => (this.expenses = tableData || []));
    }

    public onAddTransactionClick(): void {
        this.dialog.open(TransactionDialogComponent, {
            data: { isEditForm: false, itemType: TransactionTypeEnum.EXPENSE },
            disableClose: true,
        });
    }
}
