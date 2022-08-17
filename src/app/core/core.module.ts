import { IncomeFormModule } from './../shared/income-form/income-form.module';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import {
    DeleteAccountToasterComponent,
    HeaderComponent,
    NotificationsComponent,
    UserProfileComponent,
    StatisticsTableComponent,
    StatisticsFiltersComponent,
} from '@core/components';

@NgModule({
    imports: [CommonModule, SharedModule, LayoutModule, IncomeFormModule],
    exports: [HeaderComponent, StatisticsFiltersComponent, StatisticsTableComponent],
    declarations: [
        HeaderComponent,
        UserProfileComponent,
        NotificationsComponent,
        DeleteAccountToasterComponent,
        StatisticsTableComponent,
        StatisticsFiltersComponent,
    ],
    providers: [DatePipe],
})
export class CoreModule {}
