import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import {
    MainPageComponent,
    MainPageRoutingModule,
    TransactionDialogComponent,
    ViewWalletComponent,
    AddEditTransactionFormComponent,
} from '@modules/main-page';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateWalletFormComponent, CurrencyDropdownComponent } from '@modules-main-page';
import { FilterCurrencyPipe } from './pipes/filter-currency.pipe';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
    declarations: [
        MainPageComponent,
        CreateWalletFormComponent,
        CurrencyDropdownComponent,
        FilterCurrencyPipe,
        TransactionDialogComponent,
        AddEditTransactionFormComponent,
        ViewWalletComponent,
    ],
    imports: [
        CommonModule,
        MainPageRoutingModule,
        SharedModule,
        CoreModule,
        NgxMatSelectSearchModule,
        ReactiveFormsModule,
    ],
    exports: [AddEditTransactionFormComponent, TransactionDialogComponent],
})
export class MainPageModule {}
