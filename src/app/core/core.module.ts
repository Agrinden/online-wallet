import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';

import { HeaderComponent } from '@core-components/header/header.component';
import { SidenavComponent } from '@core-components/sidenav/sidenav.component';

@NgModule({
    declarations: [HeaderComponent, SidenavComponent],
    imports: [CommonModule, SharedModule, LayoutModule],
    exports: [HeaderComponent, SidenavComponent],
})
export class CoreModule {}
