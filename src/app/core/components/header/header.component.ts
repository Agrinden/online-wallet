import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '@app/core/services';
import { defaultMenuTabs, additionalMenuTabs } from '@core';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public menuItems = [] as typeof defaultMenuTabs;
    public activeLink = this.menuItems[0];
    private unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private router: Router, private userService: UserService) {}

    menuItemsChange() {
        if (!this.userService.user) this.userService.setUser();

        if (this.userService.user.isAdmin) {
            if (this.router.url === '/admin_panel') {
                this.menuItems = [additionalMenuTabs.userPanel];
            } else {
                this.menuItems = [...defaultMenuTabs, additionalMenuTabs.adminPanel];
            }
        } else {
            this.menuItems = [...defaultMenuTabs];
        }
    }

    ngOnInit(): void {
        this.router.events
            .pipe(
                filter((value: any) => value instanceof NavigationEnd),
                takeUntil(this.unsubscribeAll)
            )
            .subscribe((val) => {
                this.menuItemsChange();
            });
        this.menuItemsChange();
    }

    ngOnDestroy() {
        this.unsubscribeAll.next(null);
        this.unsubscribeAll.complete();
    }
}
