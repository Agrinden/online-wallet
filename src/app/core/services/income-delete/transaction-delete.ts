import { Injectable } from '@angular/core';
import { DialogComponent, TransactionInterface } from '@app/shared';
import { MatDialog } from '@angular/material/dialog';
import { btnFocus, ConfirmationDialogChoise } from '@shared/enums/dialog-enums';
import { incomeDeleteDialogContent, expenseDeleteDialogContent } from './transaction-delete-constants';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionDeleteService {
    private incomeDeleteDialogContent = incomeDeleteDialogContent;
    private expenseDeleteDialogContent = expenseDeleteDialogContent;

    constructor(public dialog: MatDialog) {}

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
                //request to delete transaction
            });
    }
}
