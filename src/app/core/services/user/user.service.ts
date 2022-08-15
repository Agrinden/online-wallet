import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteUrls } from '@core/constants';
import { CoreModule } from '@core/core.module';
import { AccessTokenService } from '@core/services';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CookieService } from '../cookie/cookie.service';

@Injectable({
    providedIn: CoreModule,
})
export class UserService {
    private readonly userSubject$ = new BehaviorSubject<any | null>(null);
    readonly activeUser$ = this.userSubject$.asObservable();

    constructor(
        private accessTokenService: AccessTokenService,
        private router: Router,
        private oidcSecurityService: OidcSecurityService,
        private cookieService: CookieService
    ) {}

    get user(): any | null {
        return this.userSubject$.getValue();
    }

    private set user(user: any | null) {
        this.userSubject$.next(user);
    }

    signIn(): void {
        const user = {
            sub: 'example@exadel.com',
            roles: [
                {
                    id: 1,
                    name: 'ADMIN',
                },
                {
                    id: 2,
                    name: 'USER',
                },
            ],
            exp: 1660053922,
        };
        const isAdmin = user.roles.some((role) => role.name === 'ADMIN');
        const data =
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGV4YWRlbC5jb20iLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJVU0VSIn1dLCJleHAiOjE2NTk3MzE4MjJ9.kN46guxXMJJzcvYd5Lb9Zi6FZVbHvGx1YeYsx5fLtoY'; // request to server
        this.cookieService.set(data);
        this.user = { ...user, isAdmin };
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
            of(!!this.cookieService.get()),
        ]).pipe(
            map(([isLoggedInByGoogle, isLoggedIn]) => {
                return isLoggedInByGoogle || isLoggedIn;
            })
        );
    }
}
