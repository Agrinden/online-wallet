import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { CoreModule } from '@app/core/core.module';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [MaterialModule, CoreModule],
})
export class SharedModule {}
