import { Component } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
    selector: 'del-acc-toaster-content',
    templateUrl: 'DeleteAccountToasterContent.component.html',
    styleUrls: ['DeleteAccountToasterContent.component.scss'],
})
export class DelAccToasterContent {
    constructor(public snackbarRef: MatSnackBarRef<DelAccToasterContent>) {}

    closeHandler() {
        this.snackbarRef.dismiss();
    }
}
