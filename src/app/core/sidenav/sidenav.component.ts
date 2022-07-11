import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
    mode = new FormControl('over' as MatDrawerMode);
    shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

    constructor() {}

    ngOnInit(): void {}
}
