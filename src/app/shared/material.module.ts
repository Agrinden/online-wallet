import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [
        MatDialogModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatInputModule,
        MatFormFieldModule,
        MatMenuModule,
        MatDialogModule,
        MatSelectModule,
        TextFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MomentDateModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatTabsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTableModule,
        MatSortModule,
        MatSelectModule,
        TextFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MomentDateModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatCardModule,
        MatTooltipModule,
    ],
    providers: [
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'DD/MM/YYYY',
                },
                display: {
                    dateInput: 'DD/MM/YYYY',
                    monthYearLabel: 'MMM YYYY',
                    dateA11yLabel: 'll',
                    monthYearA11yLabel: 'LL',
                },
            },
        },
    ],
})
export class MaterialModule {}
