import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogDataInterface } from '@app/shared/interfaces/dialog-data.interface';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: DialogDataInterface,
        public matDialogRef: MatDialogRef<DialogComponent>
    ) {}

    public cancel() {
        this.close(false);
    }
    public close(value: any) {
        this.matDialogRef.close(value);
    }
    public confirm() {
        this.close(true);
    }
}
