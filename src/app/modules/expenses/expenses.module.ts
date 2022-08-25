import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { ExpensesComponent, ExpensesRoutingModule } from '@modules/expenses';
import { SharedModule } from '@shared/shared.module';
import { MainPageModule } from './../main-page/main-page.module';

@NgModule({
    declarations: [ExpensesComponent],
    imports: [CommonModule, ExpensesRoutingModule, SharedModule, CoreModule, MainPageModule],
})
export class ExpensesModule {}
