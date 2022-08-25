import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

import { MaterialModule } from '@app/shared/material.module';

import { IncomeFormComponent } from './components/income-form.component';

@NgModule({
    declarations: [IncomeFormComponent],
    imports: [MaterialModule, ReactiveFormsModule, CommonModule, SharedModule],
    exports: [IncomeFormComponent],
})
export class IncomeFormModule {}
