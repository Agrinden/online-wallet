import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { StatisticsComponent } from './statistics.component';

@NgModule({
    declarations: [StatisticsComponent],
    imports: [CommonModule, StatisticsRoutingModule, SharedModule],
})
export class StatisticsModule {}
