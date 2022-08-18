import { ReactiveFormsModule } from '@angular/forms';
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
import {
    CreateWalletFormComponent,
    CurrencyDropdownComponent,
    ListOfWalletsComponent,
    SavingsComponent,
} from '@modules-main-page';
import { FilterCurrencyPipe } from './pipes/filter-currency.pipe';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SwiperModule } from 'swiper/angular';
import { WalletLinkPipe } from '@modules/main-page/pipes/wallet-link.pipe';
import { EditWalletFormComponent } from '@modules/main-page/components/edit-wallet-form/edit-wallet-form.component';
import { ModalPigComponent } from './components/modal-pig/modal-pig.component';

@NgModule({
    declarations: [
        MainPageComponent,
        CreateWalletFormComponent,
        CurrencyDropdownComponent,
        FilterCurrencyPipe,
        TransactionDialogComponent,
        AddEditTransactionFormComponent,
        ViewWalletComponent,
        ListOfWalletsComponent,
        WalletLinkPipe,
        EditWalletFormComponent,
        SavingsComponent,
        ModalPigComponent,
    ],
    imports: [
        CommonModule,
        MainPageRoutingModule,
        SharedModule,
        CoreModule,
        NgxMatSelectSearchModule,
        ReactiveFormsModule,
        SwiperModule,
    ],
    exports: [AddEditTransactionFormComponent, TransactionDialogComponent],
})
export class MainPageModule {}
