import { IncomeModule } from './../shared/income/income.module';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { DeleteAccountToasterComponent, HeaderComponent, NotificationsComponent, UserProfileComponent } from '@core';

@NgModule({
    imports: [CommonModule, SharedModule, LayoutModule, IncomeModule],
    exports: [HeaderComponent],
    declarations: [HeaderComponent, UserProfileComponent, NotificationsComponent, DeleteAccountToasterComponent],
})
export class CoreModule {}
