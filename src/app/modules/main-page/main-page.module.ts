import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { MainPageRoutingModule, MainPageComponent, ViewWalletComponent } from '@modules/main-page';

@NgModule({
    declarations: [MainPageComponent, ViewWalletComponent],
    imports: [CommonModule, MainPageRoutingModule, SharedModule, CoreModule],
    providers: [DatePipe],
})
export class MainPageModule {}
