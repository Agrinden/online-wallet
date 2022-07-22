import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '@app/shared';
import {
    DeleteAccountToasterComponent,
    DeleteAccountToasterContentComponent,
    HeaderComponent,
    NotificationsComponent,
    SidenavComponent,
    UserProfileComponent,
} from '@core/components';

@NgModule({
    declarations: [
        HeaderComponent,
        SidenavComponent,
        UserProfileComponent,
        NotificationsComponent,
        DeleteAccountToasterContentComponent,
        DeleteAccountToasterComponent,
    ],
    imports: [CommonModule, SharedModule, LayoutModule],
    exports: [HeaderComponent, SidenavComponent],
})
export class CoreModule {}
