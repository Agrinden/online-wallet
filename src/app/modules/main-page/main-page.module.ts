import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { MainPageRoutingModule } from '@app/modules/main-page/main-page-routing.module';
import { MainPageComponent } from '@app/modules/main-page/components/main-page/main-page.component';

@NgModule({
    declarations: [MainPageComponent],
    imports: [CommonModule, MainPageRoutingModule, SharedModule, CoreModule],
})
export class MainPageModule {}
