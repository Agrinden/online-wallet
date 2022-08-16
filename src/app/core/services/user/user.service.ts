import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteUrls } from '@core/constants';
import { CoreModule } from '@core/core.module';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CookieService } from '../cookie/cookie.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { UserFormInterface, UserInterface } from '@app/shared';
import jwtDecode from 'jwt-decode';

@Injectable({
    providedIn: CoreModule,
})
export class UserService {
    private readonly userSubject$ = new BehaviorSubject<any | null>(null);
    readonly activeUser$ = this.userSubject$.asObservable();

    constructor(
        private http: HttpClient,
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

    public login(user: UserFormInterface) {
        return this.http.post<any>(`${environment.apiUrl}/users/login`, user, { observe: 'response' }).pipe(
            filter((response) => response.status === 200),
            catchError((error) => {
                return of(error === '500' ? 'User already exists' : error);
            })
        );
    }

    public setUser() {
        const token = this.cookieService.get();
        if (token) {
            const user: UserInterface = jwtDecode(token);
            const isAdmin = user.authorities.some((role) => role === 'ROLE_ADMIN');

            this.user = { ...user, isAdmin };
        }
    }

    signOut() {
        this.user = null;
        this.cookieService.clear();
        this.oidcSecurityService.logoff();
        this.router.navigate([RouteUrls.login]);
        return this.http.get<any>(`${environment.apiUrl}/users/logout`, { observe: 'response' }).pipe(
            filter((response) => response.status === 200),
            catchError((error) => {
                return of(error);
            })
        );
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
