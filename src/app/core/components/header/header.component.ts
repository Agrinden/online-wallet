import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() drawer!: MatSidenav;
    @Input() isHandset!: boolean | null;

    redirectToPage(page: string) {
        window.location.href = window.location.origin + '/' + page;
    }
}
