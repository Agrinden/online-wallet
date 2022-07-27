import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import {
    MainPageComponent,
    MainPageRoutingModule,
    CreateWalletFormComponent,
    CurrencyDropdownComponent,
} from '@modules-main-page';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterCurrencyPipe } from './pipes/filter-currency.pipe';

@NgModule({
    declarations: [MainPageComponent, CreateWalletFormComponent, CurrencyDropdownComponent, FilterCurrencyPipe],
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
