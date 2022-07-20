import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '@app/shared/shared.module';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';

import { UserProfileComponent } from '@core-components/user-profile/user-profile.component';
import { NotificationsComponent } from '@core-components/notifications/notifications.component';
import { AccessTokenService, UserService } from './services';


@NgModule({
    declarations: [HeaderComponent, SidenavComponent, UserProfileComponent, NotificationsComponent],
    imports: [CommonModule, SharedModule, LayoutModule],
    exports: [HeaderComponent, SidenavComponent],
    providers: [UserService, AccessTokenService],
})
export class CoreModule {}
