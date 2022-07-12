import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    public ngOnInit(): void {
        this.loginForm = this.initializeForm();
    }

    public login(): void {
        if (this.loginForm.valid) {
            // TODO: add request to BE
            console.log(this.loginForm.value);
        }
    }

    // TODO: add validators
    /**@description method for creating formGroup */
    private initializeForm(): FormGroup {
        const form = this.formBuilder.group({
            email: '',
            password: '',
        });
        return form;
    }
}
