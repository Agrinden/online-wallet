import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SavingsComponent } from '@modules-savings/savings/savings.component';
import { SavingsRoutingModule } from '@modules/savings/savings-routing.module';
import { CoreModule } from '@app/core/core.module';

@NgModule({
    declarations: [SavingsComponent],
    imports: [CommonModule, SavingsRoutingModule, SharedModule, CoreModule],
})
export class SavingsModule {}
