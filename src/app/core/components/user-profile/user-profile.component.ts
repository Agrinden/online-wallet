import { Component } from '@angular/core';
import { settingsMenu, userProfileMenu } from '@core/constants';
import { UserService, UserDeleteService } from '@core/services';

import { mockUser } from '@core';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
    constructor(private userService: UserService, private userDeleteService: UserDeleteService) {}

    public userProfileItems = userProfileMenu;

    public settingsMenuItems = settingsMenu;

    public user = mockUser;

    public logout(): void {
        this.userService.signOut();
    }

    public openDialog(): void {
        this.userDeleteService.handleOpenDialog();
    }
}
