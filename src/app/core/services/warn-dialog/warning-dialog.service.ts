import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/shared';
import { ConfirmationDialogChoise } from '@app/shared/enums/dialog-enums';
import { filter, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WarningDialogService {
    constructor(private dialog: MatDialog) {}

    callWarnDialog(dialogContent: any) {
        return this.dialog
            .open(DialogComponent, {
                data: {
                    dialogHeading: dialogContent.dialogHeading,
                    dialogContent: dialogContent.dialogContent,
                },
                width: '400px',
                height: 'fit-content',
                panelClass: 'dialog-container',
            })
            .afterClosed()
            .pipe(
                filter((value) => value === ConfirmationDialogChoise.confirm),
                take(1)
            );
    }
}
