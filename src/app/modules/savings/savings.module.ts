import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavingsRoutingModule } from './savings-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { SavingsComponent } from './savings.component';
import { CoreModule } from '@app/core/core.module';

@NgModule({
    declarations: [SavingsComponent],
    imports: [CommonModule, SavingsRoutingModule, SharedModule, CoreModule],
})
export class SavingsModule {}
