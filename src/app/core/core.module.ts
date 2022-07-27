import { IncomeFormModule } from './../shared/income-form/income-form.module';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import {
    DeleteAccountToasterComponent,
    HeaderComponent,
    NotificationsComponent,
    UserProfileComponent,
} from '@core/components';

@NgModule({
    imports: [CommonModule, SharedModule, LayoutModule, IncomeFormModule],
    exports: [HeaderComponent],
    declarations: [HeaderComponent, UserProfileComponent, NotificationsComponent, DeleteAccountToasterComponent],
})
export class CoreModule {}
