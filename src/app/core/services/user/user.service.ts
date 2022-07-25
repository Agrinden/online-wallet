import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteUrls } from '@core/constants';
import { CoreModule } from '@core/core.module';
import { AccessTokenService } from '@core/services';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: CoreModule,
})
export class UserService {
    private readonly userSubject$ = new BehaviorSubject<any | null>(null);
    readonly activeUser$ = this.userSubject$.asObservable();

    constructor(private accessTokenService: AccessTokenService, private router: Router) {}

    get user(): any | null {
        return this.userSubject$.getValue();
    }

    private set user(user: any | null) {
        this.userSubject$.next(user);
    }

    signOut(): void {
        this.user = null;
        this.accessTokenService.clear();
        this.router.navigate([RouteUrls.login]);
    }

    public get isLoggedIn$(): Observable<boolean> {
        // return this.activeUser$.pipe(map((user) => !!user));
        return of(true);
    }
}
