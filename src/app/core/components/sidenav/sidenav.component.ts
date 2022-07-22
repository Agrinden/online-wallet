import { Component, OnInit } from '@angular/core';
import { menuTabs } from '@core/constants';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
    public menuItems = menuTabs;
    public activeLink = menuTabs[0];

    ngOnInit(): void {
        this.activeLink = this.menuItems[0];
    }
}
