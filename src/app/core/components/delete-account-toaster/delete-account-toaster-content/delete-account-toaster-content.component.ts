import { Component } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { UserService } from '@core';

@Component({
    selector: 'del-acc-toaster-content',
    templateUrl: 'delete-account-toaster-content.component.html',
    styleUrls: ['delete-account-toaster-content.component.scss'],
})
export class DeleteAccountToasterContentComponent {
    constructor(
        private userService: UserService,
        public snackbarRef: MatSnackBarRef<DeleteAccountToasterContentComponent>
    ) {}

    public closeHandler() {
        this.snackbarRef.dismiss();
        this.userService.signOut();
    }
}
