import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteUrls } from '@core/constants/routes';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { take } from 'rxjs';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private oidcSecurityService: OidcSecurityService
    ) {}

    public ngOnInit(): void {
        this.loginForm = this.getInitializedForm();

        this.oidcSecurityService
            .checkAuth()
            .pipe(take(1))
            .subscribe(() => {});
    }

    public login(): void {
        if (this.loginForm.valid) {
            // TODO: add request to BE
            console.log(this.loginForm.value);
        }
    }

    public signInGoogleHandler(): void {
        this.oidcSecurityService
            .authorizeWithPopUp()
            .pipe(take(1))
            .subscribe(() => {
                this.router.navigate([RouteUrls.main]);
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
