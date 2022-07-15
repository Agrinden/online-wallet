import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree,
} from '@angular/router';
import { map, Observable, first, of } from 'rxjs';
import { RouteUrls } from '../constants/routes';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
    private isAuth$: Observable<boolean> = of(true);

    constructor(private router: Router) {}
    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.getIsAuth();
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.getIsAuth();
    }

    private getIsAuth(): Observable<boolean> {
        return this.isAuth$.pipe(
            first(),
            map((isAuth) => {
                if (!isAuth) this.router.navigate([RouteUrls.login]);
                return isAuth;
            })
        );
    }
}
