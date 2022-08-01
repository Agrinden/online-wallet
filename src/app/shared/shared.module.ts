import { IncomeTableComponent } from './income-table/components/income-table.component';
import { ViewIncomeListModule } from './view-income-list/view-income-list.module';
import { ViewIncomeListComponent } from './view-income-list/components/view-income-list.component';
import { OpenIncomeFormComponent } from './open-income-form/components/open-income-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared/material.module';
import { DialogModule } from './dialog/dialog.module';

import { DialogComponent } from '@shared/dialog';

@NgModule({
    declarations: [DialogComponent, OpenIncomeFormComponent, IncomeTableComponent],
    imports: [CommonModule, MaterialModule, RouterModule, DialogModule, ViewIncomeListModule],
    exports: [
        MaterialModule,
        RouterModule,
        DialogComponent,
        OpenIncomeFormComponent,
        ViewIncomeListComponent,
        IncomeTableComponent,
    ],
})
export class SharedModule {}
