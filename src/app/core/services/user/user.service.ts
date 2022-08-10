import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteUrls } from '@core/constants';
import { CoreModule } from '@core/core.module';
import { AccessTokenService } from '@core/services';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
    providedIn: CoreModule,
})
export class UserService {
    private readonly userSubject$ = new BehaviorSubject<any | null>(null);
    readonly activeUser$ = this.userSubject$.asObservable();

    constructor(
        private accessTokenService: AccessTokenService,
        private router: Router,
        private oidcSecurityService: OidcSecurityService
    ) {}

    get user(): any | null {
        return this.userSubject$.getValue();
    }

    private set user(user: any | null) {
        this.userSubject$.next(user);
    }

    signIn(): void {
        const data = ''; //request to server
    }

    signOut(): void {
        this.user = null;
        this.accessTokenService.clear();
        this.oidcSecurityService.logoff();
        this.router.navigate([RouteUrls.login]);
    }

    public get isLoggedIn$(): Observable<boolean> {
        // return this.activeUser$.pipe(map((user) => !!user));

        return combineLatest([
            this.oidcSecurityService.checkAuth().pipe(map(({ isAuthenticated }) => isAuthenticated)),
            of(true),
        ]).pipe(
            map(([isLoggedInByGoogle, isLoggedIn]) => {
                return isLoggedInByGoogle || isLoggedIn;
            })
        );
    }
}
