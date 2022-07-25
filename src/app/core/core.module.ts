import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { HeaderComponent, NotificationsComponent, UserProfileComponent } from '@core/components';

@NgModule({
    declarations: [HeaderComponent, UserProfileComponent, NotificationsComponent],
    imports: [CommonModule, SharedModule, LayoutModule],
    exports: [HeaderComponent],
})
export class CoreModule {}
