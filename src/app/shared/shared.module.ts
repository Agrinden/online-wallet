import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared/material.module';

import { Dialog, DialogContent } from '@shared/Dialog/Dialog.component';

@NgModule({
    declarations: [Dialog, DialogContent],
    imports: [CommonModule, MaterialModule, RouterModule],
    exports: [MaterialModule, RouterModule, Dialog],
})
export class SharedModule {}
