import { TransactionTypeEnum } from './../../../../shared/enums/transaction-type.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateWalletFormComponent } from '@app/modules/main-page/components/create-wallet-form/create-wallet-form.component';
import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { DialogDataInterface } from '@app/shared/interfaces/dialog-data.interface';
import { IncomeDataService, shouldCreateWallet, WalletsStoreService } from '@core';
import { TransactionDialogComponent } from '@modules/main-page';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { RECENT_TRANSACTIONS_DATA } from '@app/mocks/recent-transactions';
import { TransactionInterface } from '@app/shared';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnDestroy, OnInit {
    public type = TransactionTypeEnum;
    public tableTypes = TransactionTypeEnum;
    public transaction: TransactionInterface[] = [];
    public transaction$: Observable<TransactionInterface[]> = this.incomeDataService.getAll();

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private dialogService: DialogService,
        private walletStoreService: WalletsStoreService,
        private dialog: MatDialog,
        private incomeDataService: IncomeDataService
    ) {}

    ngOnInit(): void {
        this.transaction$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
            this.transaction = res;
        });
    }

    public openShouldCreateDialog(): void {
        const options: DialogDataInterface = {
            title: shouldCreateWallet,
            confirmText: 'Ok',
            width: '500px',
            disableClose: true,
        };

        const dialog = this.dialogService.open(options);

        this.dialogService
            .confirmed(dialog)
            .pipe(
                takeUntil(this.destroy$),
                filter((res) => !!res)
            )
            .subscribe();
    }

    public onAddTransactionClick(itemType: TransactionTypeEnum): void {
        if (!this.walletStoreService.wallets.length) {
            this.openShouldCreateDialog();
        } else {
            this.dialog.open(TransactionDialogComponent, {
                data: { isEditForm: false, itemType },
                disableClose: true,
                autoFocus: false,
            });
        }
    }

    public onEditTransactionClick(itemType: TransactionTypeEnum, itemId: string): void {
        this.dialog.open(TransactionDialogComponent, {
            data: { isEditForm: true, itemType, itemId },
            disableClose: true,
            autoFocus: false,
        });
    }

    public openCreateWalletModal() {
        const options: DialogDataInterface = {
            title: 'Add wallet',
            content: CreateWalletFormComponent,
            width: '500px',
            disableClose: true,
        };

        const dialog = this.dialogService.open(options);

        this.dialogService
            .confirmed(dialog)
            .pipe(
                takeUntil(this.destroy$),
                filter((res) => !!res)
            )
            .subscribe((wallet) => {
                this.walletStoreService.add(wallet).pipe(takeUntil(this.destroy$)).subscribe();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
