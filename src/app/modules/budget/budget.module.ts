import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { BudgetRoutingModule } from '@modules/budget/budget-routing.module';
import { BudgetComponent } from '@modules-budget/budget/budget.component';

@NgModule({
    declarations: [BudgetComponent],
    imports: [CommonModule, BudgetRoutingModule, SharedModule, CoreModule],
})
export class BudgetModule {}
