import { TransactionInterface, WalletInterface } from '@app/shared';
import { BehaviorSubject, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { WalletTransactionsService } from '@core/services/wallet-transactions/wallet-transactions.service';

export class Wallet implements WalletInterface {
    private readonly recentTransactionsSubject$ = new BehaviorSubject<TransactionInterface[]>([]);
    public readonly recentTransactions$ = this.recentTransactionsSubject$.asObservable();

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly isDefault: boolean,
        public readonly currency: string,
        public readonly balance: number,
        private readonly walletTransactionsService: WalletTransactionsService
    ) {
        this.loadMoreTransactions();
    }

    public loadMoreTransactions(): void {
        const numberOfTransactions = 10;
        const walletTransactions = this.recentTransactionsSubject$.value;
        const numberOfTransactionsToSkip = walletTransactions.length;

        this.walletTransactionsService
            .get(this.id, numberOfTransactionsToSkip, numberOfTransactions)
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
