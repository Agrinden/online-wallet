import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { StatisticsComponent } from './statistics.component';
import { CoreModule } from '@app/core/core.module';

@NgModule({
    declarations: [StatisticsComponent],
    imports: [CommonModule, StatisticsRoutingModule, SharedModule, CoreModule],
})
export class StatisticsModule {}
