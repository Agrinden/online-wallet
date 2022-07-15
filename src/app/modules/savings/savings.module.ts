import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';
import { SavingsComponent } from '@app/modules/savings/components/savings/savings.component';
import { SavingsRoutingModule } from '@app/modules/savings/savings-routing.module';

@NgModule({
    declarations: [SavingsComponent],
    imports: [CommonModule, SavingsRoutingModule, SharedModule, CoreModule],
})
export class SavingsModule {}
