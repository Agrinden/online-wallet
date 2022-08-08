import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogDataInterface } from '@app/shared/interfaces/dialog-data.interface';

@Injectable()
export class DialogService {
    constructor(private dialog: MatDialog) {}

    public dialogRef!: MatDialogRef<DialogComponent>;

    public open(options: DialogDataInterface): MatDialogRef<DialogComponent> {
        return (this.dialogRef = this.dialog.open(DialogComponent, {
            data: {
                title: options.title,
                content: options.content,
                cancelText: options.cancelText,
                confirmText: options.confirmText,
                data: options.data,
            },
            width: options.width,
            disableClose: options.disableClose,
        }));
    }
    public confirmed(dialogRef: any): Observable<any> {
        return dialogRef.afterClosed().pipe(take(1));
    }

    public close() {
        this.dialog.closeAll();
    }
}
