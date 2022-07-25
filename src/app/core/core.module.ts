import { IncomeModule } from './../shared/income/income.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '@app/shared';
import { HeaderComponent, NotificationsComponent, SidenavComponent, UserProfileComponent } from '@core/components';

@NgModule({
    declarations: [HeaderComponent, SidenavComponent, UserProfileComponent, NotificationsComponent],
    imports: [CommonModule, SharedModule, LayoutModule, IncomeModule],
    exports: [HeaderComponent, SidenavComponent],
})
export class CoreModule {}
