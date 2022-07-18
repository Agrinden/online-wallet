import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';
import { IncomesRoutingModule } from '@app/modules/incomes/incomes-routing.module';
import { IncomesComponent } from '@app/modules/incomes/components/incomes/incomes.component';

@NgModule({
    declarations: [IncomesComponent],
    imports: [CommonModule, IncomesRoutingModule, SharedModule, CoreModule],
})
export class IncomesModule {}
