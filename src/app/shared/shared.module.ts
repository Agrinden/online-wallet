import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared/material.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, MaterialModule, RouterModule],
    exports: [MaterialModule, RouterModule],
})
export class SharedModule {}
