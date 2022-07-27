import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogComponent } from '@shared/dialog';
import { MaterialModule } from '@shared/material.module';

@NgModule({
    declarations: [DialogComponent],
    imports: [CommonModule, MaterialModule, RouterModule],
    exports: [MaterialModule, RouterModule, DialogComponent],
})
export class SharedModule {}
