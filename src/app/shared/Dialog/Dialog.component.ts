import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'dialog-template',
    styleUrls: ['Dialog.component.scss'],
    templateUrl: 'Dialog.component.html',
})
export class Dialog {
    @Input() handleClose!: (value: boolean) => void;
    @Input() dialogHeading!: string;
    @Input() dialogContent!: string;

    constructor(public dialog: MatDialog) {}

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogContent, {
            data: {
                dialogHeading: this.dialogHeading,
                dialogContent: this.dialogContent,
            },
            width: '400px',
            height: 'fit-content',
            panelClass: 'dialog-container',
        });

        dialogRef.afterClosed().subscribe((value: boolean) => {
            this.handleClose(value);
        });
    }
}

interface DialogContentInputValues {
    dialogHeading: string;
    dialogContent: string;
}

@Component({
    selector: 'dialog-content',
    styleUrls: ['Dialog.component.scss'],
    templateUrl: 'DialogContent.component.html',
})
export class DialogContent {
    dialogHeading = '';
    dialogContent = '';

    constructor(
        @Inject(MAT_DIALOG_DATA) data: DialogContentInputValues,
        public dialogRef: MatDialogRef<DialogContent>
    ) {
        this.dialogHeading = data.dialogHeading;
        this.dialogContent = data.dialogContent;
    }

    handleClick(res: boolean) {
        this.dialogRef.close(res);
    }
}
