import { OpenIncomeFormComponent } from './open-income-form/components/open-income-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogModule } from './dialog/dialog.module';
import { DialogComponent } from '@shared/dialog';
import { MaterialModule } from '@shared/material.module';

@NgModule({
    declarations: [DialogComponent, OpenIncomeFormComponent],
    imports: [CommonModule, MaterialModule, RouterModule, DialogModule],
    exports: [MaterialModule, RouterModule, DialogComponent, DialogComponent, OpenIncomeFormComponent],
})
export class SharedModule {}
