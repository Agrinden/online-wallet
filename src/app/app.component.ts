import { Component, HostListener } from '@angular/core';
import { UserService } from './core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private userService: UserService) {}

    @HostListener('document:click')
    handleMouseEvent() {
        this.userService.resetIdle();
    }

    @HostListener('document:keydown')
    handleKeyDown() {
        this.userService.resetIdle();
    }

    @HostListener('document:mousemove')
    handleMouseMove() {
        this.userService.resetIdle();
    }
}
