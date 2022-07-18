import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';
import { StatisticsRoutingModule } from '@modules/statistics/statistics-routing.module';
import { StatisticsComponent } from '@modules-statistics/statistics/statistics.component';

@NgModule({
    declarations: [StatisticsComponent],
    imports: [CommonModule, StatisticsRoutingModule, SharedModule, CoreModule],
})
export class StatisticsModule {}
