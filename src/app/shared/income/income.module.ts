import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/shared/material.module';

import { IncomeFormComponent } from './components/income.component';

@NgModule({
    declarations: [IncomeFormComponent],
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    exports: [IncomeFormComponent],
})
export class IncomeModule {}
