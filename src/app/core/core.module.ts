import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { StatisticsBarComponent } from './statistics-bar/statistics-bar.component';

@NgModule({
    declarations: [StatisticsBarComponent],
    imports: [CommonModule, SharedModule],
    exports: [StatisticsBarComponent],
})
export class CoreModule {}
