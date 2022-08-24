import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogComponent, TransactionInterface } from '@app/shared';
import { MatDialog } from '@angular/material/dialog';
import { btnFocus, ConfirmationDialogChoise } from '@shared/enums/dialog-enums';
import { dialogContent } from './income-delete-constants';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IncomeDeleteService {
    private dialogContent = dialogContent;

    constructor(public dialog: MatDialog, private http: HttpClient) {}

    handleOpenDialog(incomeData: TransactionInterface) {
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

        dialogRef
            .afterClosed()
            .pipe(filter((value) => value === ConfirmationDialogChoise.confirm))
            .subscribe((value: ConfirmationDialogChoise) => {
                if (value) {
                    this.http.delete<any>(`${environment.apiUrl}/transactions/${incomeData.id}`).subscribe();
                }
            });
    }
}
