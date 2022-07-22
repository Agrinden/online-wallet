import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dialogContent } from '@core/components/delete-account-toaster/delete-account-toaster-constants';
import { DeleteAccountToasterContentComponent } from '@app/core';
import { ConfirmationDialogChoise } from '@shared/enums/dialog-enums';

@Component({
    selector: 'del-acc-toaster',
    templateUrl: 'delete-account-toaster.component.html',
    styleUrls: ['delete-account-toaster.component.scss'],
})
export class DeleteAccountToasterComponent implements OnInit {
    constructor(private snackBar: MatSnackBar) {}

    public dialogContent = dialogContent;

    public openToaster(value: ConfirmationDialogChoise) {
        if (value === ConfirmationDialogChoise.confirm)
            this.snackBar.openFromComponent(DeleteAccountToasterContentComponent, {
                panelClass: 'snackbar-container',
            });
    }

    ngOnInit() {
        this.openToaster = this.openToaster.bind(this);
    }
}
