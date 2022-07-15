import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';
import { IncomesExpensesRoutingModule } from '@modules/incomes-expenses/incomes-expenses-routing.module';
import { StatisticsComponent } from '@modules-statistics/statistics/statistics.component';

@NgModule({
    declarations: [StatisticsComponent],
    imports: [CommonModule, IncomesExpensesRoutingModule, SharedModule, CoreModule],
})
export class IncomesExpensesModule {}
