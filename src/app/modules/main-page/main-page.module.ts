import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import {
    AddEditTransactionFormComponent,
    MainPageComponent,
    MainPageRoutingModule,
    TransactionDialogComponent,
} from '@modules/main-page';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [MainPageComponent, AddEditTransactionFormComponent, TransactionDialogComponent],
    imports: [CommonModule, MainPageRoutingModule, SharedModule, CoreModule],
})
export class MainPageModule {}
