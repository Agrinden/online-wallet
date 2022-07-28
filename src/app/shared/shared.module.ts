import { OpenIncomeFormComponent } from './open-income-form/components/open-income-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared/material.module';
import { DialogModule } from './dialog/dialog.module';

import { DialogComponent } from '@shared/dialog';
import { LoaderComponent } from './loader/components/loader.component';

@NgModule({
    declarations: [DialogComponent, OpenIncomeFormComponent, LoaderComponent],
    imports: [CommonModule, MaterialModule, RouterModule, DialogModule],
    exports: [MaterialModule, RouterModule, DialogComponent, DialogComponent, OpenIncomeFormComponent, LoaderComponent],
})
export class SharedModule {}
