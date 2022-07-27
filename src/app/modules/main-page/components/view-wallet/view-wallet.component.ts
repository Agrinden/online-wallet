import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { WalletService } from '@core';
import { TransactionInterface } from '@shared/interfaces/transaction.interface';

interface Column {
    dataField: keyof Pick<TransactionInterface, 'categoryName' | 'transactionAmount' | 'date'>;
    title: string;
}

@Component({
    selector: 'app-view-wallet',
    templateUrl: './view-wallet.component.html',
    styleUrls: ['./view-wallet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewWalletComponent implements OnInit {
    private readonly walletId$: Observable<string> = this.route.params.pipe(map(({ id }) => id));
    public readonly wallet$ = this.walletId$.pipe(
        switchMap((walletId) => {
            return this.walletService.getWallet(walletId);
        })
    );
    public readonly walletTransactionsSource = new MatTableDataSource<TransactionInterface>([]);
    public readonly columns: Column[] = [
        {
            dataField: 'categoryName',
            title: 'Category',
        },
        {
            dataField: 'date',
            title: 'Date',
        },
        {
            dataField: 'transactionAmount',
            title: 'Amount',
        },
    ];
    public readonly columnsToDisplay = this.columns.map(({ dataField }) => dataField);

    constructor(
        private readonly route: ActivatedRoute,
        private readonly walletService: WalletService,
        private readonly datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.addTransactions(10);
    }

    public transactionTrackBy(index: number, transaction: TransactionInterface): string {
        return transaction.id;
    }

    public addTransactions(numberOfTransactions: number): void {
        this.walletId$
            .pipe(
                switchMap((walletId) => {
                    const numberOfTransactionsToSkip = this.walletTransactionsSource.data.length;

                    return this.walletService.getWalletTransactions(
                        walletId,
                        numberOfTransactionsToSkip,
                        numberOfTransactions
                    );
                }),
                map((walletTransactions) => {
                    return walletTransactions.map((transaction) => ({
                        ...transaction,
                        date: String(this.datePipe.transform(transaction.date, 'dd.MM.YYYY')),
                    }));
                }),
                map((newWalletTransactions) => {
                    return [...this.walletTransactionsSource.data, ...newWalletTransactions];
                }),
                take(1)
            )
            .subscribe((transactions) => {
                this.walletTransactionsSource.data = transactions;
            });
    }
}
