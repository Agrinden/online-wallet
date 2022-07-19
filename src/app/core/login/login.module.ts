import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app/shared/material.module';

import { LoginComponent } from './components/login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: LoginComponent,
            },
        ]),
    ],
})
export class LoginModule {}
