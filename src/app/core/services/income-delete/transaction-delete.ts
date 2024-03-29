import { IncomeDataService } from '@app/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogComponent, TransactionInterface } from '@app/shared';
import { MatDialog } from '@angular/material/dialog';
import { btnFocus, ConfirmationDialogChoise } from '@shared/enums/dialog-enums';
import { incomeDeleteDialogContent, expenseDeleteDialogContent } from './transaction-delete-constants';
import { filter } from 'rxjs';
import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';

@Injectable({ providedIn: 'root' })
export class TransactionDeleteService {
    private incomeDeleteDialogContent = incomeDeleteDialogContent;
    private expenseDeleteDialogContent = expenseDeleteDialogContent;

    constructor(public dialog: MatDialog, private http: HttpClient, private incomeDataService: IncomeDataService) {}

    handleOpenDialog(incomeData: TransactionInterface, isExpenses: boolean) {
        const contentData = isExpenses ? this.expenseDeleteDialogContent : this.incomeDeleteDialogContent;

        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                dialogHeading: contentData.dialogHeading,
                dialogContent: contentData.dialogContent,
                btnFocus: btnFocus.confirm,
            },
            width: '400px',
            height: 'fit-content',
            panelClass: 'dialog-container',
        });

        dialogRef
            .afterClosed()
            .pipe(filter((value) => value === ConfirmationDialogChoise.confirm))
            .subscribe((value: ConfirmationDialogChoise) => {
                if (value) {
                    this.http
                        .delete<any>(`${environment.apiUrl}/transactions/${incomeData.id}`)
                        .subscribe(
                            (updateData) =>
                                (updateData = this.incomeDataService.get(TransactionTypeEnum.EXPENSE).subscribe())
                        );
                }
            });
    }
}
