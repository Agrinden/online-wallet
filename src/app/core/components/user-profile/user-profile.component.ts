import { Component } from '@angular/core';
import { settingsMenu, userProfileMenu } from '@app/core/constants';

import { UserStoreService } from '@core-services/user-store/user-store.service';
import { mockUser } from '@app/mocks';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
    constructor(private userStoreService: UserStoreService) {}
    public userProfileItems = userProfileMenu;

    public settingsMenuItems = settingsMenu;

    public user = mockUser;

    public logout(): void {
        this.userStoreService.signOut();
    }
}
