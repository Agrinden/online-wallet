import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseRoutingModule } from './expense-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { ExpenseComponent } from './expense.component';
import { CoreModule } from '@app/core/core.module';

@NgModule({
    declarations: [ExpenseComponent],
    imports: [CommonModule, ExpenseRoutingModule, SharedModule, CoreModule],
})
export class ExpenseModule {}
