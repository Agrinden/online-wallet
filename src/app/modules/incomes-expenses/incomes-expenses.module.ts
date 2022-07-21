import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { IncomesExpensesComponent, IncomesExpensesRoutingModule } from '@modules/incomes-expenses';

@NgModule({
    declarations: [IncomesExpensesComponent],
    imports: [CommonModule, IncomesExpensesRoutingModule, SharedModule, CoreModule],
})
export class IncomesExpensesModule {}
