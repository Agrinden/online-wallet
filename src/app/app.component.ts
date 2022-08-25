import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { UserService, WarningDialogService } from './core';
import { autoLogoutContent } from './core/services/user-delete/user-delete-constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private isLogged = false;

    public idleInterval!: any;

    constructor(
        private userService: UserService,
        private ngZone: NgZone,
        private warnDialogService: WarningDialogService,
        private dialog: MatDialog
    ) {}

    @HostListener('document:click')
    handleMouseEvent() {
        this.resetIdle();
    }

    @HostListener('document:keydown')
    handleKeyDown() {
        this.resetIdle();
    }

    @HostListener('document:mousemove')
    handleMouseMove() {
        this.resetIdle();
    }

    ngOnInit(): void {
        this.setAuthState();
        this.setLastAction(Date.now());
        this.checkIdle();
        this.initInterval();
    }

    private setAuthState() {
        this.userService.isLoggedIn$
            .pipe(takeUntil(this.userService.unsubscribeOnSignout$))
            .subscribe((value) => (this.isLogged = value));
    }

    public getLastAction(): string {
        return sessionStorage.getItem('lastAction') || '';
    }

    public setLastAction(value: any): void {
        sessionStorage.setItem('lastAction', JSON.stringify(value));
    }

    public initInterval() {
        this.ngZone.runOutsideAngular(() => {
            this.idleInterval = setInterval(() => {
                this.checkIdle();
            }, 60 * 1000);
        });
    }

    public clearIdleInterval() {
        clearInterval(this.idleInterval);
    }

    public resetIdle(): void {
        this.setLastAction(Date.now());
    }

    public checkIdle(): void {
        const now = Date.now();
        const timeLeft = parseInt(this.getLastAction()) + 60 * 60 * 1000 - 6000;
        const diff = timeLeft - now;
        const isTimeout = diff < 0;

        this.ngZone.run(() => {
            if (this.isLogged && isTimeout) {
                sessionStorage.removeItem('lastAction');
                this.warnDialogService
                    .open(autoLogoutContent)
                    .pipe(takeUntil(this.userService.unsubscribeOnSignout$))
                    .subscribe((submittedValue) => {
                        if (submittedValue) {
                            this.resetIdle();
                        } else {
                            this.dialog.closeAll();
                            this.clearIdleInterval();
                            this.userService.signOut();
                        }
                    });
            }
        });
    }
}
