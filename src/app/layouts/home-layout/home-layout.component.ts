import { Component, OnDestroy, OnInit } from '@angular/core';
import { WalletsStoreService } from '@core/services/wallets-store/wallets-store.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit, OnDestroy {
    private readonly destroy$: Subject<null> = new Subject();

    constructor(private readonly walletStoreService: WalletsStoreService) {}

    public ngOnInit(): void {
        this.walletStoreService.loadInitialData().pipe(takeUntil(this.destroy$)).subscribe();
    }

    public ngOnDestroy(): void {
        this.walletStoreService.clear();

        this.destroy$.next(null);
        this.destroy$.complete();
    }
}
