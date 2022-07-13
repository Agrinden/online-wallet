import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    public ngOnInit(): void {
        this.loginForm = this.getInitializedForm();
    }

    public login(): void {
        if (this.loginForm.valid) {
            // TODO: add request to BE
            console.log(this.loginForm.value);
        }
    }

    // TODO: add validators
    /**@description method for creating formGroup */
    private getInitializedForm(): FormGroup {
        const form = this.formBuilder.group({
            email: '',
            password: '',
        });
        return form;
    }
}
