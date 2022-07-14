import { Component } from '@angular/core';
@Component({
    selector: 'app-statistics-bar',
    templateUrl: './statistics-bar.component.html',
    styleUrls: ['./statistics-bar.component.scss'],
})
export class StatisticsBarComponent {
    statisticsBarItems = [
        {
            name: 'Notifications',
            icon: 'notifications',
            route: '',
        },
        {
            name: 'Disable alerts',
            icon: 'notifications_off',
        },
        {
            name: 'Links',
            icon: 'link',
            route: '',
        },
        {
            name: 'Statistics',
            icon: 'bar_chart',
            route: '',
        },
    ];
}
