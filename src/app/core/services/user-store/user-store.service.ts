import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteUrls } from '@app/core/constants';
import { SessionStorageService } from '@core-services/session-storage/session-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserStoreService {
    private readonly userSubject$ = new BehaviorSubject<any | null>(null);
    readonly activeUser$ = this.userSubject$.asObservable();

    constructor(private sessionStorageService: SessionStorageService, private router: Router) {}

    get user(): any | null {
        return this.userSubject$.getValue();
    }

    private set user(user: any | null) {
        this.userSubject$.next(user);
    }

    signOut(): void {
        this.user = null;
        this.sessionStorageService.clearAccessToken();
        this.router.navigate([RouteUrls.login]);
    }
}
