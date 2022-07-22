import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '@app/shared';
import { HeaderComponent, NotificationsComponent, SidenavComponent, UserProfileComponent } from '@core/components';
import { DelAccToaster } from '@core/components/DeleteAccountToaster/DeleteAccountToaster.component';
import { DelAccToasterContent } from '@core/components/DeleteAccountToaster/DeleteAccountToasterContent/DeleteAccountToasterContent.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SidenavComponent,
        UserProfileComponent,
        NotificationsComponent,
        DelAccToaster,
        DelAccToasterContent,
    ],
    imports: [CommonModule, SharedModule, LayoutModule],
    exports: [HeaderComponent, SidenavComponent],
})
export class CoreModule {}
