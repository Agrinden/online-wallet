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
import { RouteUrls } from '@core';

import { first, map, Observable } from 'rxjs';
import { UserService } from '@core';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private router: Router,private userService: UserService, private oidcSecurityService: OidcSecurityService) {}
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
        return this.getIsAuth$();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getIsAuth$();
    }

    private getIsAuth$(): Observable<boolean> {
        return this.userService.isLoggedIn$.pipe(
            first(),
            map((isLoggedIn) => {
                if (!isLoggedIn) this.router.navigate([RouteUrls.login]);
                return isLoggedIn;
            })
        );
    }
}
