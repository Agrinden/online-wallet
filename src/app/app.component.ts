import { EnvironmentService } from '@core';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'onlineWallet';
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(private environmentService: EnvironmentService) {}

    ngOnInit() {
        this.environmentService
            .sendGetRequest()
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => console.log(data));
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
