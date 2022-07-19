import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
} from '@angular/router';
import { RouteUrls } from '@app/core/constants/routes';
import { first, map, Observable, of } from 'rxjs';
import { SessionStorageService } from '../services/session-storage/session-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private router: Router, private sessionStorageService: SessionStorageService) {}

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
        return this.getIsAuth$();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getIsAuth$();
    }

    private getIsAuth$(): Observable<boolean> {
        return this.sessionStorageService.isLoggedIn$.pipe(
            first(),
            map((isLoggedIn) => {
                if (!isLoggedIn) this.router.navigate([RouteUrls.login]);
                return isLoggedIn;
            })
        );
    }
}
