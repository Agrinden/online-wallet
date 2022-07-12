import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [MatRadioModule, MatMenuModule, MatIconModule, MatSidenavModule],
})
export class MaterialModule {}
