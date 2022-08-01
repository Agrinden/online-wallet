import { Component } from '@angular/core';
import { logoutContent } from '@app/core/services/user-delete/user-delete-constants';
import { WarningDialogService } from '@app/core/services/warn-dialog/warning-dialog.service';
import { ConfirmationDialogChoise } from '@app/shared/enums/dialog-enums';
import { mockUser } from '@core';
import { settingsMenu, userProfileMenu } from '@core/constants';
import { UserDeleteService, UserService } from '@core/services';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
    private destroy$ = new Subject();
    constructor(
        private userService: UserService,
        private userDeleteService: UserDeleteService,
        private warnDialogService: WarningDialogService
    ) {}

    public userProfileItems = userProfileMenu;

    public settingsMenuItems = settingsMenu;

    public user = mockUser;

    public logout(): void {
        this.warnDialogService
            .open(logoutContent)
            .pipe(
                filter((value) => value === ConfirmationDialogChoise.confirm),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.userService.signOut());
    }

    public openDialog(): void {
        this.userDeleteService.handleOpenDialog();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
