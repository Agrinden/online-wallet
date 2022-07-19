import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [MatIconModule, MatListModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatMenuModule],
})
export class MaterialModule {}
