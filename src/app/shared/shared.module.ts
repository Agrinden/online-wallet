import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared/material.module';
import { DialogModule } from './dialog/dialog.module';

import { DialogComponent } from '@shared/dialog';

@NgModule({
    declarations: [DialogComponent],
    imports: [CommonModule, MaterialModule, RouterModule, DialogModule],
    exports: [MaterialModule, RouterModule, DialogModule, DialogComponent],
})
export class SharedModule {}
