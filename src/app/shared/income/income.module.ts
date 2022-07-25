import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/shared/material.module';

import { IncomeComponent } from './components/income.component';

@NgModule({
    declarations: [IncomeComponent],
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    exports: [IncomeComponent],
})
export class IncomeModule {}
