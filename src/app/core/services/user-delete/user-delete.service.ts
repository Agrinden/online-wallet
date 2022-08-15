import { Injectable } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { DialogComponent } from '@app/shared';
import { MatDialog } from '@angular/material/dialog';
import { btnFocus, ConfirmationDialogChoise } from '@shared/enums/dialog-enums';
import { DeleteAccountToasterComponent } from '@app/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dialogContent } from '@core/services/user-delete/user-delete-constants';

@Injectable({
    providedIn: CoreModule,
})
export class UserDeleteService {
    private dialogContent = dialogContent;

    constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

    public openToaster(value: ConfirmationDialogChoise) {
        if (value === ConfirmationDialogChoise.confirm)
            this.snackBar.openFromComponent(DeleteAccountToasterComponent, {
                panelClass: 'snackbar-container',
            });
    }

    handleOpenDialog() {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                dialogHeading: this.dialogContent.dialogHeading,
                dialogContent: this.dialogContent.dialogContent,
                btnFocus: btnFocus.refuse,
            },
            width: '400px',
            height: 'fit-content',
            panelClass: 'dialog-container',
        });
        dialogRef.afterClosed().subscribe((value: ConfirmationDialogChoise) => {
            this.openToaster(value);
        });
    }

    ngOnInit() {
        this.openToaster = this.openToaster.bind(this);
    }
}
