import { Component } from '@angular/core';
import { menuTabs } from '@core/constants';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent {
    public menuItems = menuTabs;
    public activeLink = menuTabs[0];
}
