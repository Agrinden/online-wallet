import { Component } from '@angular/core';
import { settingsMenu, userProfileMenu } from '@core/constants';
import { UserService, UserDeleteService } from '@core/services';

import { mockUser } from '@core';
import { WarningDialogService } from '@app/core/services/warn-dialog/warning-dialog.service';
import { logoutContent } from '@app/core/services/user-delete/user-delete-constants';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
    constructor(
        private userService: UserService,
        private userDeleteService: UserDeleteService,
        private warnDialogService: WarningDialogService
    ) {}

    public userProfileItems = userProfileMenu;

    public settingsMenuItems = settingsMenu;

    public user = mockUser;

    public logout(): void {
        this.warnDialogService.invokeWarnDialog(logoutContent).subscribe(() => this.userService.signOut());
    }

    public openDialog(): void {
        this.userDeleteService.handleOpenDialog();
    }
}
