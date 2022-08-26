import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { WalletsStoreService } from '@core';
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
export class ListOfWalletsComponent implements OnInit {
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
    public wallets$!: Observable<WalletInterface[]>;

    constructor(private readonly walletStoreService: WalletsStoreService) {}

    ngOnInit(): void {
        this.wallets$ = this.walletStoreService.wallets$;
    }
}
