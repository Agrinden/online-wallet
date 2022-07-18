import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;

    constructor(private router: Router, private formBuilder: FormBuilder, private authService: SocialAuthService) {}

    public ngOnInit(): void {
        this.loginForm = this.getInitializedForm();
    }

    public login(): void {
        if (this.loginForm.valid) {
            // TODO: add request to BE
            console.log(this.loginForm.value);
        }
    }

    public signInGoogleHandler(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
            localStorage.setItem('google_auth', JSON.stringify(data));
        });
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
