import { Component } from '@angular/core';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
    public notifications = [
        {
            name: 'User1',
            desc: [
                { text: 'Bla-bla-bla Bla-bla-bla Bla-bla-bla Bla-bla-bla', date: '02-02-2020' },
                { text: 'La-la-la La-la-la La-la-la', date: '02-02-2020' },
            ],
        },
    ];
}
