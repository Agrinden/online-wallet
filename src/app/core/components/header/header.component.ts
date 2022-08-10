import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { defaultMenuTabs, additionalMenuTabs } from '@core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public user = {
        sub: 'example@exadel.com',
        roles: [
            {
                id: 1,
                name: 'ADMIN',
            },
            {
                id: 2,
                name: 'USER',
            },
        ],
        exp: 1660053922,
    };
    public menuItems = [] as typeof defaultMenuTabs;
    public activeLink = this.menuItems[0];

    menuItemsChange() {
        let isAdmin = false;
        this.user.roles.forEach((el) => {
            if (el.name === 'ADMIN') isAdmin = true;
        });

        if (isAdmin) {
            if (window.location.pathname === '/admin_panel') {
                this.menuItems = [additionalMenuTabs.user_panel];
            } else {
                this.menuItems = [...defaultMenuTabs];
                this.menuItems.push(additionalMenuTabs.admin_panel);
            }
        }
    }

    constructor(private router: Router) {
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.menuItemsChange();
            }
        });
    }

    ngOnInit(): void {
        this.menuItemsChange();
    }
}
