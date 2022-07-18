import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouteUrls } from '@core/constants/routes';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

interface MenuItem {
    name: string;
    icon: string;
    route: string | null;
    onClick: () => void;
}

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
    readonly isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map((result) => result.matches),
        shareReplay()
    );

    readonly menuItems: MenuItem[] = [
        { name: 'Login', icon: 'lock', route: null, onClick: () => {} },
        { name: 'Register', icon: 'person_add', route: null, onClick: () => {} },
        {
            name: 'Logout',
            icon: 'exit_to_app',
            route: null,
            onClick: () => {
                this.logOut();
            },
        },
    ];

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private oidcSecurityService: OidcSecurityService
    ) {}

    private logOut(): void {
        this.oidcSecurityService.logoff();
        this.router.navigate([RouteUrls.login]);
    }
}
