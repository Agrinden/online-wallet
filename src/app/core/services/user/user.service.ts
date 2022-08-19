import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInterface } from '@app/shared';
import { ConfirmationDialogChoise } from '@app/shared/enums/dialog-enums';
import { RouteUrls } from '@core/constants';
import { CoreModule } from '@core/core.module';
import { AccessTokenService, WarningDialogService } from '@core/services';
import { environment } from '@env/environment';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { catchError, combineLatest, map, Observable, of, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { autoLogoutContent } from '../user-delete/user-delete-constants';

@Injectable({
    providedIn: CoreModule,
})
export class UserService {
    private destroy$ = new Subject();

    private isLogged = false;

    constructor(
        private http: HttpClient,
        private accessTokenService: AccessTokenService,
        private router: Router,
        private oidcSecurityService: OidcSecurityService,
        private ngZone: NgZone,
        private warnDialogService: WarningDialogService,
        private dialog: MatDialog
    ) {
        this.setAuthState();
        this.setLastAction(Date.now());
        this.checkIdle();
        this.initListener();
        this.initInterval();
    }

    public setAuthState() {
        this.isLoggedIn$.pipe(takeUntil(this.destroy$)).subscribe((value) => (this.isLogged = value));
    }

    public getLastAction(): string {
        return localStorage.getItem('lastAction') || '';
    }

    public setLastAction(value: any): void {
        localStorage.setItem('lastAction', JSON.stringify(value));
    }

    public initListener(): void {
        this.ngZone.runOutsideAngular(() => {
            document.body.addEventListener('click', () => this.resetIdle());
        });
    }

    public initInterval(): void {
        this.ngZone.runOutsideAngular(() => {
            setInterval(() => {
                this.checkIdle();
            }, 10);
        });
    }

    public resetIdle(): void {
        this.setLastAction(Date.now());
    }

    public checkIdle(): void {
        const now = Date.now();
        const timeLeft = parseInt(this.getLastAction()) + 3 * 60 * 10;
        const diff = timeLeft - now;
        const isTimeout = diff < 100;

        this.ngZone.run(() => {
            if (this.isLogged) {
                console.log('log' + this.isLogged);
                if (isTimeout) {
                    console.log('time' + isTimeout);
                    localStorage.removeItem('lastAction');

                    this.warnDialogService
                        .open(autoLogoutContent)
                        .pipe(
                            filter((value) => value === ConfirmationDialogChoise.confirm),
                            takeUntil(this.destroy$)
                        )
                        .subscribe(() => {
                            this.dialog.closeAll();
                            this.signOut();
                        });
                }
            }
        });
    }

    public login(user: UserInterface): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/users/login`, user, { observe: 'response' }).pipe(
            filter((response) => response.status === 200),
            catchError((error) => {
                return of(error);
            })
        );
    }

    public signOut(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
        this.setAuthState();

        this.accessTokenService.clear();
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
