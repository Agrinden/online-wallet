import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '@app/shared';
import { ConfirmationDialogChoise } from '@shared/enums/dialog-enums';

@Component({
    selector: 'dialog-template',
    templateUrl: 'dialog.component.html',
})
export class DialogComponent {
    @Input() public handleClose!: (value: ConfirmationDialogChoise) => void;
    @Input() public dialogHeading!: string;
    @Input() public dialogContent!: string;

    constructor(public dialog: MatDialog) {}

    public openDialog(): void {
        const dialogRef = this.dialog.open(DialogContentComponent, {
            data: {
                dialogHeading: this.dialogHeading,
                dialogContent: this.dialogContent,
            },
            width: '400px',
            height: 'fit-content',
            panelClass: 'dialog-container',
        });

        dialogRef.afterClosed().subscribe((value: ConfirmationDialogChoise) => {
            this.handleClose(value);
        });
    }
}
