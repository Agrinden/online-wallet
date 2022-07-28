import { AddCategoryComponent } from './add-category/components/add-category.component';
import { OpenIncomeFormComponent } from './open-income-form/components/open-income-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared/material.module';
import { DialogModule } from './dialog/dialog.module';

import { DialogComponent } from '@shared/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DialogComponent, OpenIncomeFormComponent, AddCategoryComponent],
    imports: [CommonModule, MaterialModule, RouterModule, DialogModule, ReactiveFormsModule],
    exports: [
        MaterialModule,
        RouterModule,
        DialogComponent,
        DialogComponent,
        OpenIncomeFormComponent,
        AddCategoryComponent,
    ],
})
export class SharedModule {}
