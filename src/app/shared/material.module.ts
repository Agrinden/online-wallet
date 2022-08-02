import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
        ReactiveFormsModule,
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
        MatSelectModule,
        TextFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MomentDateModule,
        MatProgressSpinnerModule,
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
