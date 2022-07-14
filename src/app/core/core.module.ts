import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { StatisticsBarComponent } from './statistics-bar/statistics-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HeaderComponent } from '@core-components/header/header.component';
import { SidenavComponent } from '@core-components/sidenav/sidenav.component';

@NgModule({
    declarations: [StatisticsBarComponent, HeaderComponent, SidenavComponent],
    imports: [CommonModule, SharedModule, LayoutModule],
    exports: [StatisticsBarComponent, HeaderComponent, SidenavComponent],
})
export class CoreModule {}
