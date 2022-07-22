import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared/material.module';

import { DialogComponent, DialogContentComponent } from '@shared/dialog';

@NgModule({
    declarations: [DialogComponent, DialogContentComponent],
    imports: [CommonModule, MaterialModule, RouterModule],
    exports: [MaterialModule, RouterModule, DialogComponent],
})
export class SharedModule {}
