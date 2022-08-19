import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { CreateWalletInterface, WalletInterface } from '@app/shared';
import { WalletService } from '@core';

@Injectable({ providedIn: 'root' })
export class WalletsStoreService {
    private readonly walletsSubject$: BehaviorSubject<WalletInterface[]> = new BehaviorSubject<WalletInterface[]>([]);
    public readonly wallets$: Observable<WalletInterface[]> = this.walletsSubject$.asObservable();

    constructor(private readonly walletService: WalletService) {}

    private get wallets(): WalletInterface[] {
        return this.walletsSubject$.value;
    }

    public loadInitialData(): void {
        this.walletService.getWallets().subscribe((wallets) => {
            this.walletsSubject$.next(wallets);
        });
    }

    public clear(): void {
        this.walletsSubject$.next([]);
    }

    public addWallet(wallet: CreateWalletInterface): Observable<WalletInterface[]> {
        return this.walletService.createWallet(wallet).pipe(
            map((id) => {
                const newWallet: WalletInterface = {
                    id,
                    balance: 0,
                    ...wallet,
                };

                this.walletsSubject$.next([...this.wallets, newWallet]);

                return this.wallets;
            })
        );
    }

    public editWallet(wallet: WalletInterface): Observable<WalletInterface[]> {
        return this.walletService.edit(wallet.id, wallet).pipe(
            tap((editedWallet) => {
                const wallets = this.wallets.map((w) => {
                    if (w.id === editedWallet.id) {
                        return editedWallet;
                    }

                    return w;
                });

                this.walletsSubject$.next(wallets);
            }),
            map(() => this.wallets)
        );
    }

    public deleteWallet(id: string): Observable<WalletInterface[]> {
        return this.walletService.delete(id).pipe(
            tap(() => {
                this.walletsSubject$.next(this.wallets.filter((wallet) => String(wallet.id) !== String(id)));
            }),
            map(() => {
                return this.wallets;
            })
        );
    }

    public getWallet(id: string): Observable<WalletInterface | null> {
        return this.wallets$.pipe(
            map((wallets) => {
                return wallets.find((wallet) => String(wallet.id) === String(id)) ?? null;
            }),
            distinctUntilChanged()
        );
    }
}
