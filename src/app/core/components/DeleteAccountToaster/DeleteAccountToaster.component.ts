import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DelAccToasterContent } from '@core/components/DeleteAccountToaster/DeleteAccountToasterContent/DeleteAccountToasterContent.component';

@Component({
    selector: 'del-acc-toaster',
    templateUrl: 'DeleteAccountToaster.component.html',
    styleUrls: ['DeleteAccountToaster.component.scss'],
})
export class DelAccToaster implements OnInit {
    constructor(private _snackBar: MatSnackBar) {}

    dialogHeading = 'Account deletion';
    dialogContent =
        'Are you sure you want to delete your account? All your data will be lost, you can download your report from the\n' +
        'Statistics page before confirming';

    openToaster(value: boolean) {
        if (value)
            this._snackBar.openFromComponent(DelAccToasterContent, {
                panelClass: 'snackbar-container',
            });
    }

    ngOnInit() {
        this.openToaster = this.openToaster.bind(this);
    }
}
