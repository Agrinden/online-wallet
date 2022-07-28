import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import {
    MainPageComponent,
    MainPageRoutingModule,
    CreateWalletFormComponent,
    CurrencyDropdownComponent,
    ViewWalletComponent,
} from '@modules-main-page';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterCurrencyPipe } from './pipes/filter-currency.pipe';

@NgModule({
    declarations: [
        MainPageComponent,
        CreateWalletFormComponent,
        CurrencyDropdownComponent,
        FilterCurrencyPipe,
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
    providers: [DatePipe],
})
export class MainPageModule {}
