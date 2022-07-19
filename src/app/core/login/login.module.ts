import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LoginComponent } from './components/login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        CommonModule,
        MatIconModule,
        RouterModule.forChild([
            {
                path: '',
                component: LoginComponent,
            },
        ]),
    ],
})
export class LoginModule {}
