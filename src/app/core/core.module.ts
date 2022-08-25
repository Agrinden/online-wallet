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
    StatisticsFiltersComponent,
} from '@core/components';
import { StatisticsFiltersModule } from './components/statistics-filters/statistics-filters.module';

@NgModule({
    imports: [CommonModule, SharedModule, LayoutModule, IncomeFormModule, StatisticsFiltersModule],
    exports: [HeaderComponent, StatisticsFiltersComponent],
    declarations: [HeaderComponent, UserProfileComponent, NotificationsComponent, DeleteAccountToasterComponent],
    providers: [DatePipe],
})
export class CoreModule {}
