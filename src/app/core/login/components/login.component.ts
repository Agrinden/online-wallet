import { UserService } from '@core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Subject, take, takeUntil } from 'rxjs';
import { RouteUrls } from '@app/core';
import { AccessTokenService } from '@core/services';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public loginForm!: FormGroup;
    public isPassVisible!: boolean;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private oidcSecurityService: OidcSecurityService,
        private userService: UserService,
        private accessTokenService: AccessTokenService
    ) {}

    public ngOnInit(): void {
        this.loginForm = this.getInitializedForm();

        this.startAuthenticationFlow();
    }

    public login(): void {
        if (this.loginForm.valid) {
            this.userService
                .login(this.loginForm.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe((response) => {
                    const token = response.headers.get('Authorization');

                    this.accessTokenService.set(token);
                    console.log(token);

                    this.router.navigate([RouteUrls.main]);
                });
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
            username: [
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

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
