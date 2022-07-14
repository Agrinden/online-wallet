import { MaterialModule } from '@app/shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [],
    imports: [CommonModule, MaterialModule],
    exports: [MaterialModule],
})
export class SharedModule {}
