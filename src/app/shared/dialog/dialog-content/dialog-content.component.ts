import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogContentInputValues } from '@shared/interfaces/dialog.interface';
import { ConfirmationDialogChoise } from '@shared/enums/dialog-enums';

@Component({
    selector: 'dialog-content',
    styleUrls: ['dialog-content.component.scss'],
    templateUrl: 'dialog-content.component.html',
})
export class DialogContentComponent {
    public dialogHeading = '';
    public dialogContent = '';

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: DialogContentInputValues,
        public dialogRef: MatDialogRef<DialogContentComponent>
    ) {
        this.dialogHeading = data.dialogHeading;
        this.dialogContent = data.dialogContent;
    }

    public handleClose(res: ConfirmationDialogChoise) {
        this.dialogRef.close(res);
    }
}
