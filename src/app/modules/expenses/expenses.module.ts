import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { ExpensesComponent, ExpensesRoutingModule } from '@modules/expenses';

@NgModule({
    declarations: [ExpensesComponent],
    imports: [CommonModule, ExpensesRoutingModule, SharedModule, CoreModule],
})
export class ExpensesModule {}
