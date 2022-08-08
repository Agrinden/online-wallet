import { TransactionInterface, WalletInterface } from '@app/shared';
import { BehaviorSubject, take } from 'rxjs';
import { WalletService } from '@core';
import { map } from 'rxjs/operators';

export class Wallet implements WalletInterface {
    private readonly recentTransactionsSubject$ = new BehaviorSubject<TransactionInterface[]>([]);
    public readonly recentTransactions$ = this.recentTransactionsSubject$.asObservable();

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly isDefault: boolean,
        public readonly currency: string,
        public readonly balance: number,
        private readonly walletService: WalletService
    ) {
        this.loadMoreTransactions();
    }

    public destroy(): void {
        this.recentTransactionsSubject$.next([]);
        this.recentTransactionsSubject$.complete();
    }

    public loadMoreTransactions(): void {
        const numberOfTransactions = 10;
        const walletTransactions = this.recentTransactionsSubject$.value;
        const numberOfTransactionsToSkip = walletTransactions.length;

        this.walletService
            .getWalletTransactions(this.id, numberOfTransactionsToSkip, numberOfTransactions)
            .pipe(
                map((newWalletTransactions) => {
                    return [...walletTransactions, ...newWalletTransactions];
                }),
                take(1)
            )
            .subscribe((transactions) => {
                this.recentTransactionsSubject$.next(transactions);
            });
    }
}
