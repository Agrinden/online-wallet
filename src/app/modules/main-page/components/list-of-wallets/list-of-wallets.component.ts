import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { WalletService } from '@core';
import { WalletInterface } from '@shared/interfaces/wallet.interface';

import { Navigation, SwiperOptions } from 'swiper';
import SwiperCore from 'swiper';

SwiperCore.use([Navigation]);

@Component({
    selector: 'app-list-of-wallets',
    templateUrl: './list-of-wallets.component.html',
    styleUrls: ['./list-of-wallets.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ListOfWalletsComponent implements OnInit, OnDestroy {
    private readonly destroy$: Subject<null> = new Subject();
    public readonly config: SwiperOptions = {
        slidesPerView: 1,
        navigation: true,
        preventClicks: true,
        preventClicksPropagation: true,
        breakpoints: {
            450: { slidesPerView: 2, spaceBetween: 10 },
            550: { slidesPerView: 3, spaceBetween: 15 },
        },
    };
    public wallets!: WalletInterface[];

    constructor(private readonly walletService: WalletService, private readonly changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.walletService
            .getWallets()
            .pipe(takeUntil(this.destroy$))
            .subscribe((wallets) => {
                this.wallets = wallets;
                this.changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }
}
