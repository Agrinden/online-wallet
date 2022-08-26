import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MaterialModule } from '@app/shared/material.module';

import { ViewIncomeListComponent } from './components/view-income-list.component';

@NgModule({
    declarations: [ViewIncomeListComponent],
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    exports: [ViewIncomeListComponent],
})
export class ViewIncomeListModule {}
