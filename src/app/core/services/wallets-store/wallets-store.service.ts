import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { CreateWalletInterface, WalletInterface } from '@app/shared';
import { WalletService } from '@core';

@Injectable({ providedIn: 'root' })
export class WalletsStoreService {
    private readonly walletsSubject$: BehaviorSubject<WalletInterface[]> = new BehaviorSubject<WalletInterface[]>([]);
    public readonly wallets$: Observable<WalletInterface[]> = this.walletsSubject$.asObservable();

    constructor(private readonly walletService: WalletService) {}

    public get wallets(): WalletInterface[] {
        return this.walletsSubject$.value;
    }

    public loadInitialData(): Observable<WalletInterface[]> {
        return this.walletService.getWallets().pipe(
            tap((wallets) => {
                this.walletsSubject$.next(wallets);
            })
        );
    }

    public clear(): void {
        this.walletsSubject$.next([]);
    }

    public add(wallet: CreateWalletInterface): Observable<WalletInterface[]> {
        return this.walletService.createWallet(wallet).pipe(
            tap((id) => {
                const newWallet: WalletInterface = {
                    id: id,
                    balance: 0,
                    ...wallet,
                };

                this.walletsSubject$.next([...this.wallets, newWallet]);
            }),
            map(() => {
                return this.wallets;
            })
        );
    }

    public edit(wallet: WalletInterface): Observable<WalletInterface[]> {
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
            map(() => {
                return this.wallets;
            })
        );
    }

    public delete(id: string): Observable<WalletInterface[]> {
        return this.walletService.delete(id).pipe(
            tap(() => {
                this.walletsSubject$.next(this.wallets.filter((wallet) => String(wallet.id) !== String(id)));
            }),
            map(() => {
                return this.wallets;
            })
        );
    }

    public get(id: string): Observable<WalletInterface | null> {
        return this.wallets$.pipe(
            map((wallets) => {
                return wallets.find((wallet) => String(wallet.id) === String(id)) ?? null;
            }),
            distinctUntilChanged()
        );
    }
}
