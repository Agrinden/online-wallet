import { Component } from '@angular/core';
import { mockNotifications } from '@core';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
    public notifications = mockNotifications;
}
