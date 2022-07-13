import { Component } from '@angular/core';
@Component({
  selector: 'app-statistics-bar',
  templateUrl: './statistics-bar.component.html',
  styleUrls: ['./statistics-bar.component.scss']
})
export class StatisticsBarComponent {
  statisticsBarItems = [{
    name: 'Notifications',
    url: '',
    icon: 'notifications',
  },
  {
    name: 'Disable alerts',
    url: '',
    icon: 'notifications_off',
  },
  {
    name: 'Links',
    url: '',
    icon: 'link',
  },
  {
    name: 'Statistics',
    url: '',
    icon: 'bar_chart',
  },
] 
}
