import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';
import { IncomesExpensesRoutingModule } from '@modules/incomes-expenses/incomes-expenses-routing.module';
import { IncomesExpensesComponent } from '@modules-incomes-expenses/incomes-expenses/incomes-expenses.component';

@NgModule({
    declarations: [IncomesExpensesComponent],
    imports: [CommonModule, IncomesExpensesRoutingModule, SharedModule, CoreModule],
})
export class IncomesExpensesModule {}
