import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import {
    AddEditTransactionFormComponent,
    MainPageComponent,
    MainPageRoutingModule,
    TransactionDialogComponent,
    ViewWalletComponent,
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
        AddEditTransactionFormComponent,
        TransactionDialogComponent,
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
})
export class MainPageModule {}
