import { AddCategoryComponent } from './add-category/components/add-category.component';
import { OpenIncomeFormComponent } from './open-income-form/components/open-income-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared/material.module';
import { DialogModule } from './dialog/dialog.module';

import { DialogComponent } from '@shared/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/components/loader.component';
import {
    MAT_COLOR_FORMATS,
    NgxMatColorPickerModule,
    NGX_MAT_COLOR_FORMATS,
} from '@angular-material-components/color-picker';

@NgModule({
    declarations: [DialogComponent, OpenIncomeFormComponent, AddCategoryComponent, LoaderComponent],
    imports: [CommonModule, MaterialModule, RouterModule, DialogModule, ReactiveFormsModule, NgxMatColorPickerModule],
    exports: [
        MaterialModule,
        RouterModule,
        DialogComponent,
        OpenIncomeFormComponent,
        AddCategoryComponent,
        LoaderComponent,
    ],
    providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }],
})
export class SharedModule {}
