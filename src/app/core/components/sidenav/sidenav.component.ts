import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map((result) => result.matches),
        shareReplay()
    );

    menuItems = [
        { name: 'Login', icon: 'lock', route: '' },
        { name: 'Register', icon: 'person_add', route: '' },
        { name: 'Logout', icon: 'exit_to_app', route: '' },
    ];

    constructor(private breakpointObserver: BreakpointObserver) {}
}
