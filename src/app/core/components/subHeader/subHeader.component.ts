import { Component } from '@angular/core';

@Component({
    selector: 'app-subheader',
    templateUrl: './subHeader.component.html',
    styleUrls: ['./subHeader.component.scss'],
})
export class SubHeaderComponent {
    currentPage = window.location.pathname.slice(1);
}
