import { IncomeDataService } from '../../core/services/income-data/income-data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { AdminPanelComponent, AdminPanelRoutingModule } from '@modules/admin-panel';

@NgModule({
    declarations: [AdminPanelComponent],
    imports: [CommonModule, AdminPanelRoutingModule, SharedModule, CoreModule],
})
export class AdminPanelModule {}
