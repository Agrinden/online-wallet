import { OpenIncomeFormComponent } from './open-income-form/components/open-income-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared/material.module';

import { DialogComponent } from '@shared/dialog';

@NgModule({
    declarations: [DialogComponent, OpenIncomeFormComponent],
    imports: [CommonModule, MaterialModule, RouterModule],
    exports: [MaterialModule, RouterModule, DialogComponent, OpenIncomeFormComponent],
})
export class SharedModule {}
