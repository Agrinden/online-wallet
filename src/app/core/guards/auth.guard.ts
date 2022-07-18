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

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
    private isAuth$: Observable<boolean> = of(true);

    constructor(private router: Router) {}
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
        return this.getIsAuth$();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getIsAuth$();
    }

    private getIsAuth$(): Observable<boolean> {
        return this.isAuth$.pipe(
            first(),
            map((isAuth) => {
                if (!isAuth) this.router.navigate([RouteUrls.login]);
                return isAuth;
            })
        );
    }
}
