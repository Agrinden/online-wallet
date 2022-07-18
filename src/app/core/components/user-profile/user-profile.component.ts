import { Component } from '@angular/core';
import { settingsMenu, userProfileMenu } from '@app/core/constants/menu';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
    public userProfileItems = userProfileMenu;

    public settingsMenuItems = settingsMenu;
}
