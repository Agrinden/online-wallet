import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { IDialogData } from '@app/shared/interfaces/dialog-data.interface';

@Injectable()
export class DialogService {
    constructor(private dialog: MatDialog) {}

    dialogRef!: MatDialogRef<DialogComponent>;

    public open(options: IDialogData) {
        this.dialogRef = this.dialog.open(DialogComponent, {
            data: {
                title: options.title,
                content: options.content,
                cancelText: options.cancelText,
                confirmText: options.confirmText,
            },
            width: options.width,
            disableClose: options.disableClose,
        });
    }
    public confirmed(): Observable<any> {
        return this.dialogRef.afterClosed().pipe(
            take(1),
            map((res) => {
                return res;
            })
        );
    }
}
