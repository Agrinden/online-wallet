import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomesExpensesComponent } from '@modules-incomes-expenses/incomes-expenses/incomes-expenses.component';

const routes: Routes = [{ path: '', component: IncomesExpensesComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IncomesExpensesRoutingModule {}
