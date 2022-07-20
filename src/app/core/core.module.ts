import { NotificationsComponent } from './components/notifications/notifications.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '@app/shared/shared.module';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [HeaderComponent, SidenavComponent, UserProfileComponent, NotificationsComponent],
    imports: [CommonModule, SharedModule, LayoutModule],
    exports: [HeaderComponent, SidenavComponent],
})
export class CoreModule {}
