import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { filter, map, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { WalletService } from '@core';
import { TransactionInterface } from '@shared/interfaces/transaction.interface';
import { Wallet } from '@shared/models/wallet';
import { WalletInterface } from '@app/shared';
import { WalletTransactionsService } from '@core/services/wallet-transactions/wallet-transactions.service';

interface Column {
    dataField: keyof Pick<TransactionInterface, 'category' | 'amount' | 'date'>;
    title: string;
}

@Component({
    selector: 'app-view-wallet',
    templateUrl: './view-wallet.component.html',
    styleUrls: ['./view-wallet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewWalletComponent implements OnInit, OnDestroy {
    private readonly destroy$: Subject<null> = new Subject();
    public readonly columns: Column[] = [
        {
            dataField: 'category',
            title: 'Category',
        },
        {
            dataField: 'date',
            title: 'Date',
        },
        {
            dataField: 'amount',
            title: 'Amount',
        },
    ];
    public readonly columnsToDisplay = this.columns.map(({ dataField }) => dataField);
    public wallet!: Wallet;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly walletService: WalletService,
        private readonly walletTransactionsService: WalletTransactionsService
    ) {}

    public ngOnInit(): void {
        this.initializeWallet();
    }

    public ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }

    public transactionTrackBy(index: number, transaction: TransactionInterface): string {
        return transaction.id;
    }

    public showMoreTransactions(): void {
        this.wallet.loadMoreTransactions();
    }

    private initializeWallet(): void {
        this.walletService
            .getWallet(this.route.snapshot.params['id'])
            .pipe(
                filter((wallet) => wallet !== null),
                map((wallet) => wallet as WalletInterface),
                take(1)
            )
            .subscribe(({ id, name, isDefault, currency, balance }) => {
                this.wallet = new Wallet(id, name, isDefault, currency, balance, this.walletTransactionsService);
            });
    }
}
