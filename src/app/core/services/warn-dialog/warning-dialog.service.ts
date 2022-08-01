import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/shared';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WarningDialogService {
    constructor(private dialog: MatDialog) {}

    public open(dialogContent: any): Observable<any> {
        return this.dialog
            .open(DialogComponent, {
                data: {
                    dialogHeading: dialogContent.dialogHeading,
                    dialogContent: dialogContent.dialogContent,
                },
                width: '400px',
                height: 'fit-content',
                panelClass: 'dialog-container',
                disableClose: true,
            })
            .afterClosed();
    }
}
