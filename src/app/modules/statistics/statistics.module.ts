import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';
import { StatisticsComponent } from '@app/modules/statistics/component/statistics/statistics.component';
import { StatisticsRoutingModule } from '@app/modules/statistics/statistics-routing.module';

@NgModule({
    declarations: [StatisticsComponent],
    imports: [CommonModule, StatisticsRoutingModule, SharedModule, CoreModule],
})
export class StatisticsModule {}
