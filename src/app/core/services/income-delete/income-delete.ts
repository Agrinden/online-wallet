import { Injectable } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { DialogComponent } from '@app/shared';
import { MatDialog } from '@angular/material/dialog';
import { btnFocus, ConfirmationDialogChoise } from '@shared/enums/dialog-enums';
import { dialogContent } from '@core/services/expense-delete/expense-delete-constants';

@Injectable({
    providedIn: CoreModule,
})
export class ExpenseDeleteService {
    private dialogContent = dialogContent;

    constructor(public dialog: MatDialog) {}

    handleOpenDialog() {
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
            console.log(value);
        });
    }
}
