import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatInputModule,
        MatFormFieldModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatTabsModule,
        MatDialogModule,
        MatSnackBarModule,
    ],
})
export class MaterialModule {}
