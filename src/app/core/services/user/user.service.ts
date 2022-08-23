import { HttpClient } from '@angular/common/http';
import { HostListener, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInterface } from '@app/shared';
import { RouteUrls } from '@core/constants';
import { CoreModule } from '@core/core.module';
import { AccessTokenService, WarningDialogService } from '@core/services';
import { environment } from '@env/environment';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, Subject, Subscription, timer } from 'rxjs';
import { filter, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { autoLogoutContent } from '../user-delete/user-delete-constants';

@Injectable({
    providedIn: CoreModule,
})
export class UserService {
    private destroy$ = new Subject();

    private isLogged!: boolean;

    public idleInterval!: any;

    public timerSubject$ = new BehaviorSubject<number>(0);

    public timerValue$ = this.timerSubject$.asObservable();

    constructor(
        private http: HttpClient,

        private router: Router,
        private oidcSecurityService: OidcSecurityService,
        private ngZone: NgZone,
        private warnDialogService: WarningDialogService,
        private dialog: MatDialog
    ) {
        this.setAuthState(true);
        this.setLastAction(Date.now());
        this.checkIdle();
        this.initInterval();
    }

    private set timerValue(timerValue: number) {
        this.timerSubject$.next(timerValue);
    }

    private setAuthState(value: boolean) {
        this.isLogged = value;
        // this.isLoggedIn$.pipe(takeUntil(this.destroy$)).subscribe((value) => (this.isLogged = value));
    }

    public getLastAction(): string {
        return sessionStorage.getItem('lastAction') || '';
    }

    public setLastAction(value: any): void {
        sessionStorage.setItem('lastAction', JSON.stringify(value));
    }

    public initInterval() {
        this.ngZone.runOutsideAngular(() => {
            this.idleInterval = setInterval(() => {
                this.checkIdle();
            }, 60 * 1000);
        });
    }

    public clearIdleInterval() {
        clearInterval(this.idleInterval);
    }

    public resetIdle(): void {
        this.setLastAction(Date.now());
    }

    public checkIdle(): void {
        const now = Date.now();
        const timeLeft = parseInt(this.getLastAction()) + 60 * 60 * 1000 - 6; // session 6sec for countdowntimer on dialog
        const diff = timeLeft - now;
        const isTimeout = diff < 0;

        this.ngZone.run(() => {
            if (this.isLogged) {
                if (isTimeout) {
                    sessionStorage.removeItem('lastAction');
                    this.warnDialogService
                        .open(autoLogoutContent)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe((submittedValue) => {
                            if (submittedValue) {
                                this.resetIdle();
                            } else {
                                this.dialog.closeAll();
                                this.signOut();
                            }
                        });
                }
            }
        });
    }

    timer(counter: number, interval: number, func: () => void): Subscription {
        let timeLast = counter;
        const obs = timer(0, interval).pipe(
            takeWhile(() => timeLast > 0),
            tap(() => (timeLast -= 1))
        );

        return obs.pipe(takeUntil(this.destroy$)).subscribe(() => {
            if (timeLast === 0) func();
            return (this.timerValue = timeLast);
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
        this.clearIdleInterval();

        this.setAuthState(false);

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
