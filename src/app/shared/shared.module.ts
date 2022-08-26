import { CurrencyIconPipe } from './../pipes/currency-icon.pipe';
import { IncomeTableComponent } from './income-table/components/income-table.component';
import { ViewIncomeListModule } from './view-income-list/view-income-list.module';
import { ViewIncomeListComponent } from './view-income-list/components/view-income-list.component';
import { AddCategoryComponent } from './add-category/components/add-category.component';
import { OpenIncomeFormComponent } from './open-income-form/components/open-income-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogModule } from './dialog/dialog.module';
import { DialogComponent } from '@shared/dialog';
import { MaterialModule } from '@shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/components/loader.component';

@NgModule({
    declarations: [
        DialogComponent,
        OpenIncomeFormComponent,
        IncomeTableComponent,
        AddCategoryComponent,
        LoaderComponent,
        CurrencyIconPipe,
    ],
    imports: [CommonModule, MaterialModule, RouterModule, DialogModule, ViewIncomeListModule, ReactiveFormsModule],
    exports: [
        MaterialModule,
        RouterModule,
        DialogComponent,
        OpenIncomeFormComponent,
        ViewIncomeListComponent,
        IncomeTableComponent,
        AddCategoryComponent,
        LoaderComponent,
        CurrencyIconPipe,
    ],
})
export class SharedModule {}
