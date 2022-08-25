import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserFormInterface, UserInterface } from '@app/shared';
import { RouteUrls } from '@core/constants';
import { CoreModule } from '@core/core.module';
import { environment } from '@env/environment';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CookieService } from '../cookie/cookie.service';

@Injectable({
    providedIn: CoreModule,
})
export class UserService {
    public unsubscribeOnSignout$ = new Subject();

    private readonly userSubject$ = new BehaviorSubject<any | null>(null);
    readonly activeUser$ = this.userSubject$.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router,
        private oidcSecurityService: OidcSecurityService,
        private cookieService: CookieService
    ) {}

    get user(): any | null {
        if (!this.userSubject$.getValue()) this.setUser();
        return this.userSubject$.getValue();
    }

    private set user(user: any | null) {
        this.userSubject$.next(user);
    }

    public login(user: UserFormInterface) {
        return this.http.post<any>(`${environment.apiUrl}/users/login`, user, { observe: 'response' }).pipe(
            filter((response) => response.status === 200),
            catchError((error) => {
                return of(error);
            })
        );
    }

    public setUser() {
        const token = this.cookieService.get('token');

        if (token) {
            const user: UserInterface = jwtDecode(token);
            const isAdmin = user.roles.some((role) => role === 'ROLE_ADMIN');

            this.user = { ...user, isAdmin };
        }
    }

    signOut() {
        this.user = null;
        this.cookieService.clear();
        this.oidcSecurityService.logoff();
        this.router.navigate([RouteUrls.login]);
        this.unsubscribeOnSignout$.next(null);
        this.unsubscribeOnSignout$.complete();
        return this.http.get<any>(`${environment.apiUrl}/users/logout`, { observe: 'response' }).pipe(
            filter((response) => response.status === 200),
            catchError((error) => {
                return of(error);
            })
        );
    }

    public get isLoggedIn$(): Observable<boolean> {
        return combineLatest([
            this.oidcSecurityService.checkAuth().pipe(map(({ isAuthenticated }) => isAuthenticated)),
            of(!!this.cookieService.get('token')),
        ]).pipe(
            map(([isLoggedInByGoogle, isLoggedIn]) => {
                return isLoggedInByGoogle || isLoggedIn;
            })
        );
    }
}
