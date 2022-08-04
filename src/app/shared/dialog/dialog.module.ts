import { MaterialModule } from '@app/shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogService } from './services/dialog.service';

@NgModule({
    declarations: [DialogComponent],
    imports: [CommonModule, MaterialModule],
    exports: [DialogComponent],
    entryComponents: [DialogComponent],
    providers: [DialogService],
})
export class DialogModule {}
