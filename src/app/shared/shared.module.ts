import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared/material.module';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, MaterialModule, RouterModule, DialogModule],
    exports: [MaterialModule, RouterModule, DialogModule],
})
export class SharedModule {}
