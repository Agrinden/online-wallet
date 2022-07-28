import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateWalletFormComponent } from '@app/modules/main-page/components/create-wallet-form/create-wallet-form.component';
import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { IDialogData } from '@app/shared/interfaces/dialog-data.interface';
import { WalletService } from '@core';
import { TransactionDialogComponent } from '@modules/main-page';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject();

    constructor(
        private dialog: MatDialog,
        private dialogService: DialogService,
        private walletService: WalletService
    ) {}

    ngOnInit(): void {}

    public onAddTransactionClick(itemType: string): void {
        this.dialog
            .open(TransactionDialogComponent, {
                data: { isEditForm: false, itemType: itemType },
            })
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }

    public onEditTransactionClick(itemType: string, itemId: string): void {
        this.dialog
            .open(TransactionDialogComponent, { data: { isEditForm: true, itemType: itemType, itemId: itemId } })
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    openCreateWalletModal() {
        const options: IDialogData = {
            title: 'Add wallet',
            content: CreateWalletFormComponent,
            width: '500px',
            disableClose: true,
        };

        this.dialogService.open(options);

        this.dialogService.confirmed().subscribe((confirmed) => {
            if (confirmed) {
                this.walletService.createWallet();
            }
        });
    }
}
