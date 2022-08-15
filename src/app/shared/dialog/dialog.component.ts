import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogContentInputValuesInterface } from '@shared/interfaces/dialog.interface';
import { btnFocus, ConfirmationDialogChoise } from '@shared/enums/dialog-enums';

@Component({
    selector: 'dialog-content',
    styleUrls: ['./dialog.component.scss'],
    templateUrl: './dialog.component.html',
})
export class DialogComponent {
    public dialogHeading = '';
    public dialogContent = '';
    public btnFocus = btnFocus;
    public btnFocused: btnFocus;
    public dialogEnum = ConfirmationDialogChoise;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: DialogContentInputValuesInterface,
        public dialogRef: MatDialogRef<DialogComponent>
    ) {
        this.btnFocused = data.btnFocus;
        this.dialogHeading = data.dialogHeading;
        this.dialogContent = data.dialogContent;
    }

    public handleClose(res: ConfirmationDialogChoise) {
        this.dialogRef.close(res);
    }
}
