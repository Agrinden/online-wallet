import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { StatisticsComponent, StatisticsRoutingModule, ReportTaleComponent } from '@modules/statistics';

@NgModule({
    declarations: [StatisticsComponent, ReportTaleComponent],
    imports: [CommonModule, StatisticsRoutingModule, SharedModule, CoreModule],
})
export class StatisticsModule {}
