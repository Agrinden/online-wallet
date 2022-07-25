import { Component } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { UserService } from '@core';

@Component({
    selector: 'del-acc-toaster',
    templateUrl: 'delete-account-toaster.component.html',
    styleUrls: ['delete-account-toaster.component.scss'],
})
export class DeleteAccountToasterComponent {
    constructor(private userService: UserService, public snackbarRef: MatSnackBarRef<DeleteAccountToasterComponent>) {}

    public closeHandler() {
        this.snackbarRef.dismiss();
        this.userService.signOut();
    }
}
