import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { filter, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { deleteDefaultWalletMessage, deleteWalletMessage, RouteUrls, SnackbarService, WalletService } from '@core';
import { TransactionInterface } from '@shared/interfaces/transaction.interface';
import { Wallet } from '@shared/models/wallet';
import { WalletInterface } from '@app/shared';
import { WalletTransactionsService } from '@core/services/wallet-transactions/wallet-transactions.service';
import { DialogService } from '@shared/dialog/services/dialog.service';
import { DialogDataInterface } from '@shared/interfaces/dialog-data.interface';
import { EditWalletFormComponent } from '@modules/main-page/components/edit-wallet-form/edit-wallet-form.component';

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
        private readonly walletTransactionsService: WalletTransactionsService,
        private readonly router: Router,
        private readonly dialogService: DialogService,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly snackbarService: SnackbarService
    ) {}

    public ngOnInit(): void {
        this.initializeWallet();
    }

    public ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }

    public transactionTrackBy(index: number, transaction: TransactionInterface): number {
        return transaction.id;
    }

    public showMoreTransactions(): void {
        this.wallet.loadMoreTransactions();
    }

    public deleteWallet(): void {
        const defaultOptions = {
            title: deleteDefaultWalletMessage,
            cancelText: 'Ok',
            width: '400px',
        };
        const nonDefaultOptions = {
            title: deleteWalletMessage,
            cancelText: 'No',
            confirmText: 'Yes',
            width: '400px',
        };
        const options = this.wallet.isDefault ? defaultOptions : nonDefaultOptions;
        const dialog = this.dialogService.open(options);

        this.dialogService
            .confirmed(dialog)
            .pipe(
                filter((isConfirmed) => isConfirmed),
                switchMap(() => this.walletService.delete(this.wallet.id)),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.router.navigate([RouteUrls.main]);
            });
    }

    public editWallet(): void {
        const options: DialogDataInterface<Wallet> = {
            title: 'Edit wallet',
            content: EditWalletFormComponent,
            contentData: this.wallet,
            width: '500px',
            disableClose: true,
        };

        const dialog = this.dialogService.open(options);

        this.dialogService
            .confirmed(dialog)
            .pipe(
                filter((wallet) => !!wallet),
                switchMap((wallet) => {
                    return this.walletService.edit(this.wallet.id, wallet);
                }),
                tap(({ name, isDefault, currency }) => {
                    this.wallet.update({ name, isDefault, currency });
                    this.changeDetectorRef.markForCheck();
                }),
                tap(() => {
                    const message = 'Your data is successfully updated';
                    this.snackbarService.openSuccess(message);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    private initializeWallet(): void {
        this.walletService
            .getWallet(this.route.snapshot.params['id'])
            .pipe(
                filter((wallet): wallet is WalletInterface => wallet !== null),
                takeUntil(this.destroy$)
            )
            .subscribe(({ id, name, isDefault, currency, balance }) => {
                this.wallet = new Wallet(id, name, isDefault, currency, balance, this.walletTransactionsService);
                this.changeDetectorRef.markForCheck();
            });
    }
}
