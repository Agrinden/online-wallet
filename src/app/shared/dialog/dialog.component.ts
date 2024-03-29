import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimerService } from '@app/core/services/timer/timer.service';
import { btnFocus, ConfirmationDialogChoise } from '@shared/enums/dialog-enums';
import { DialogContentInputValuesInterface } from '@shared/interfaces/dialog.interface';

@Component({
    selector: 'dialog-content',
    styleUrls: ['./dialog.component.scss'],
    templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
    public dialogHeading = '';
    public dialogContent = '';
    public btnFocus = btnFocus;
    public btnFocused!: btnFocus;
    public dialogEnum = ConfirmationDialogChoise;
    public hasTimer?: boolean;
    public timer$ = this.timerService.timerValue$;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: DialogContentInputValuesInterface,
        public dialogRef: MatDialogRef<DialogComponent>,
        private timerService: TimerService
    ) {}

    ngOnInit() {
        this.btnFocused = this.data.btnFocus;
        this.dialogHeading = this.data.dialogHeading;
        this.dialogContent = this.data.dialogContent;
        this.hasTimer = this.data.hasTimer;
        if (this.hasTimer) this.closeOnTickerRunOut();
    }

    public closeOnTickerRunOut() {
        this.timerService.timer(6, 1000, () => {
            this.dialogRef.close();
        });
    }

    public handleClose(res: ConfirmationDialogChoise) {
        this.dialogRef.close(res);
    }
}
