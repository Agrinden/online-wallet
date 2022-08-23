import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogContentInputValuesInterface } from '@shared/interfaces/dialog.interface';
import { btnFocus, ConfirmationDialogChoise } from '@shared/enums/dialog-enums';
import { UserService } from '@app/core/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'dialog-content',
    styleUrls: ['./dialog.component.scss'],
    templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
    public dialogHeading = '';
    public dialogContent = '';
    public btnFocus = btnFocus;
    public btnFocused: btnFocus;
    public dialogEnum = ConfirmationDialogChoise;
    public hasTimer?: boolean;
    public timer$ = this.userService.timerValue$;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: DialogContentInputValuesInterface,
        public dialogRef: MatDialogRef<DialogComponent>,
        private userService: UserService
    ) {
        this.btnFocused = data.btnFocus;
        this.dialogHeading = data.dialogHeading;
        this.dialogContent = data.dialogContent;
        this.hasTimer = data.hasTimer;
    }

    ngOnInit() {
        if (this.hasTimer) this.closeOnTickerRunOut();
    }

    public closeOnTickerRunOut() {
        this.userService.timer(6, 1000, () => {
            this.dialogRef.close();
        });
    }

    public handleClose(res: ConfirmationDialogChoise) {
        this.dialogRef.close(res);
    }
}
