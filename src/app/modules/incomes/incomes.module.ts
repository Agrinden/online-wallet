import { IncomeDataService } from './../../core/services/income-data/income-service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { IncomesComponent, IncomesRoutingModule } from '@modules/incomes';

@NgModule({
    declarations: [IncomesComponent],
    imports: [CommonModule, IncomesRoutingModule, SharedModule, CoreModule],
    providers: [IncomeDataService],
})
export class IncomesModule {}
