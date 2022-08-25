import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IncomeTableComponent } from '@app/shared';
import { ViewIncomeListComponent } from '@app/shared/view-income-list/components/view-income-list.component';
import { CoreModule } from '@core/core.module';
import { ExpensesComponent, ExpensesRoutingModule } from '@modules/expenses';
import { SharedModule } from '@shared/shared.module';
import { MainPageModule } from './../main-page/main-page.module';

@NgModule({
    declarations: [ExpensesComponent, IncomeTableComponent, ViewIncomeListComponent],
    imports: [CommonModule, ExpensesRoutingModule, SharedModule, CoreModule, MainPageModule],
})
export class ExpensesModule {}
