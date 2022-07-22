import { Component } from '@angular/core';
import { menuTabs } from '@core/constants';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
    public menuItems = menuTabs;
    public activeLink = menuTabs[0];
}
