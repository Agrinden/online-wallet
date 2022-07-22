import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'dialog-template',
    styleUrls: ['Dialog.component.scss'],
    templateUrl: 'Dialog.component.html',
})
export class Dialog {
    @Input() public handleClose!: (value: boolean) => void;
    @Input() public dialogHeading!: string;
    @Input() public dialogContent!: string;

    constructor(public dialog: MatDialog) {}

    public openDialog(): void {
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
    public dialogHeading = '';
    public dialogContent = '';

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: DialogContentInputValues,
        public dialogRef: MatDialogRef<DialogContent>
    ) {
        this.dialogHeading = data.dialogHeading;
        this.dialogContent = data.dialogContent;
    }

    public handleClick(res: boolean) {
        this.dialogRef.close(res);
    }
}
