import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core';
import { SharedModule } from '@app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './components/wallet/wallet.component';
import { CreateWalletFormComponent } from './components/create-wallet-form/create-wallet-form.component';
import { WalletRoutingModule } from './wallet-routing.module';
import { CurrencyDropdownComponent } from './components/currency-dropdown/currency-dropdown.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
    declarations: [WalletComponent, CreateWalletFormComponent, CurrencyDropdownComponent],
    imports: [
        CommonModule,
        WalletRoutingModule,
        SharedModule,
        CoreModule,
        ReactiveFormsModule,
        NgxMatSelectSearchModule,
    ],
})
export class WalletModule {}
