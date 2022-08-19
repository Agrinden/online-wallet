import { Component, OnDestroy, OnInit } from '@angular/core';
import { WalletsStoreService } from '@core/services/wallets-store/wallets-store.service';

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit, OnDestroy {
    constructor(private readonly walletStoreService: WalletsStoreService) {}

    public ngOnInit(): void {
        this.walletStoreService.loadInitialData();
    }

    public ngOnDestroy(): void {
        this.walletStoreService.clear();
    }
}
