import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { MainPageComponent, MainPageRoutingModule } from '@modules/main-page';

@NgModule({
    declarations: [MainPageComponent],
    imports: [CommonModule, MainPageRoutingModule, SharedModule, CoreModule],
})
export class MainPageModule {}
