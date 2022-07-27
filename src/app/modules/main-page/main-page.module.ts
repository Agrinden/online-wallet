import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { MainPageRoutingModule } from '@app/modules/main-page/main-page-routing.module';
import { MainPageComponent } from '@modules-main-page/main-page/main-page.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CreateWalletFormComponent } from '@modules-main-page/create-wallet-form/create-wallet-form.component';
import { CurrencyDropdownComponent } from '@modules-main-page/currency-dropdown/currency-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [MainPageComponent, CreateWalletFormComponent, CurrencyDropdownComponent],
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
