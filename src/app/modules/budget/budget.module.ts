import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { CoreModule } from '@app/core/core.module';
import { BudgetComponent } from './budget.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    declarations: [BudgetComponent],
    imports: [CommonModule, BudgetRoutingModule, SharedModule, CoreModule],
})
export class BudgetModule {}
