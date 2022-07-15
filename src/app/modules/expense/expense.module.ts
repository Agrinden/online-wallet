import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';
import { ExpenseRoutingModule } from '@modules/expense/expense-routing.module';
import { ExpenseComponent } from '@modules-expense/expense/expense.component';

@NgModule({
    declarations: [ExpenseComponent],
    imports: [CommonModule, ExpenseRoutingModule, SharedModule, CoreModule],
})
export class ExpenseModule {}
