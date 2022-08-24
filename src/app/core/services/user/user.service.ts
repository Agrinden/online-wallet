import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from '@app/shared';
import { RouteUrls } from '@core/constants';
import { CoreModule } from '@core/core.module';
import { environment } from '@env/environment';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { catchError, combineLatest, map, Observable, of, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: CoreModule,
})
export class UserService {
    public unsubscribeOnSignout$ = new Subject();

    constructor(private http: HttpClient, private router: Router, private oidcSecurityService: OidcSecurityService) {}

    public login(user: UserInterface): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/users/login`, user, { observe: 'response' }).pipe(
            filter((response) => response.status === 200),
            catchError((error) => {
                return of(error);
            })
        );
    }

    public signOut(): void {
        this.unsubscribeOnSignout$.next(null);
        this.unsubscribeOnSignout$.complete();

        this.oidcSecurityService.logoff();
        this.router.navigate([RouteUrls.login]);
    }

    public get isLoggedIn$(): Observable<boolean> {
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
