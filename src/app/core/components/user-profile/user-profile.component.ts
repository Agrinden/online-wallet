import { Component } from '@angular/core';
import { settingsMenu, userProfileMenu } from '@app/core/constants';
import { UserService } from '@app/core/services';

import { mockUser } from '@app/mocks';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
    constructor(private userService: UserService) {}
    public userProfileItems = userProfileMenu;

    public settingsMenuItems = settingsMenu;

    public user = mockUser;

    public logout(): void {
        this.userService.signOut();
    }
}
