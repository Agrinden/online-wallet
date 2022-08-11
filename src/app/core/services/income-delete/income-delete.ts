import { Injectable } from '@angular/core';
import { DialogComponent, IncomeDataInterface, TransactionInterface } from '@app/shared';
import { MatDialog } from '@angular/material/dialog';
import { btnFocus, ConfirmationDialogChoise } from '@shared/enums/dialog-enums';
import { dialogContent } from './income-delete-constants';

@Injectable({ providedIn: 'root' })
export class IncomeDeleteService {
    private dialogContent = dialogContent;

    constructor(public dialog: MatDialog) {}

    handleOpenDialog(incomeData: IncomeDataInterface | TransactionInterface) {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                dialogHeading: this.dialogContent.dialogHeading,
                dialogContent: this.dialogContent.dialogContent,
                btnFocus: btnFocus.confirm,
            },
            width: '400px',
            height: 'fit-content',
            panelClass: 'dialog-container',
        });

        dialogRef.afterClosed().subscribe((value: ConfirmationDialogChoise) => {
            if (value === ConfirmationDialogChoise.confirm) console.log(value, incomeData);
        });
    }
}
