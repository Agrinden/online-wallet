import { Component } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { UserService } from '@core';

@Component({
    selector: 'del-acc-toaster-content',
    templateUrl: 'DeleteAccountToasterContent.component.html',
    styleUrls: ['DeleteAccountToasterContent.component.scss'],
})
export class DelAccToasterContent {
    constructor(private userService: UserService, public snackbarRef: MatSnackBarRef<DelAccToasterContent>) {}

    public closeHandler() {
        this.snackbarRef.dismiss();
        this.userService.signOut();
    }
}
