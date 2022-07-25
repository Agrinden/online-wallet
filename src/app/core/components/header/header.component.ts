import { Component } from '@angular/core';
import { menuTabs } from '@core/constants';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public menuItems = menuTabs;
    public activeLink = menuTabs[0];
}
