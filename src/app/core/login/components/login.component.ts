import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { take } from 'rxjs';
import { RouteUrls } from '@app/core';
import { UserService } from '@app/core/services';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;
    public isPassVisible!: boolean;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private oidcSecurityService: OidcSecurityService,
        private userService: UserService
    ) {}

    public ngOnInit(): void {
        this.loginForm = this.getInitializedForm();

        this.startAuthenticationFlow();
    }

    public login(): void {
        if (this.loginForm.valid) {
            // TODO: add request to BE
            this.userService.signIn();
            this.router.navigate([RouteUrls.main]);

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

    public toggleVisibility(): void {
        this.isPassVisible = !this.isPassVisible;
    }

    private startAuthenticationFlow(): void {
        this.oidcSecurityService.checkAuth().pipe(take(1)).subscribe();
    }

    /**@description method for creating formGroup */
    private getInitializedForm(): FormGroup {
        const form = this.formBuilder.group({
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/^[a-z0-9]+[\.]{0,1}[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}$/),
                    Validators.maxLength(254),
                ],
            ],
            password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#\$%\^\&*\)\(/+=._-]{8,100}$/)]],
        });
        return form;
    }
}
