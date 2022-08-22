import { TransactionTypeEnum } from './../../../../shared/enums/transaction-type.enum';
import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateWalletFormComponent } from '@app/modules/main-page/components/create-wallet-form/create-wallet-form.component';
import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { DialogDataInterface } from '@app/shared/interfaces/dialog-data.interface';
import { WalletService } from '@core';
import { TransactionDialogComponent } from '@modules/main-page';
import { filter, Subject, takeUntil } from 'rxjs';
import { RECENT_TRANSACTIONS_DATA } from '@app/mocks/recent-transactions';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnDestroy {
    public type = TransactionTypeEnum;
    public tableTypes = TransactionTypeEnum;
    public transaction = RECENT_TRANSACTIONS_DATA;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private dialogService: DialogService,
        private walletService: WalletService,
        private dialog: MatDialog
    ) {}

    public onAddTransactionClick(itemType: TransactionTypeEnum): void {
        this.dialog.open(TransactionDialogComponent, {
            data: { isEditForm: false, itemType },
            disableClose: true,
            autoFocus: false,
        });
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
                this.walletService.createWallet(wallet).pipe(takeUntil(this.destroy$)).subscribe();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
