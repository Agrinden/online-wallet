import { IncomeComponent } from './../../../shared/income/components/income.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';

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

    constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog) {}

    public openIncomeForm(): void {
        this.dialog
            .open(IncomeComponent)
            .beforeClosed()
            .pipe(filter((data) => !!data))
            .subscribe();
    }
}
