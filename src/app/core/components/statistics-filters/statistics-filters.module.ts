import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/shared';

import { StatisticsFiltersComponent } from './components/statistics-filters.component';

@NgModule({
    declarations: [StatisticsFiltersComponent],
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    exports: [StatisticsFiltersComponent],
})
export class StatisticsFiltersModule {}
