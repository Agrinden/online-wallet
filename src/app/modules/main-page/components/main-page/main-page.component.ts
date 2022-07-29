import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateWalletFormComponent } from '@app/modules/main-page/components/create-wallet-form/create-wallet-form.component';
import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { WalletService } from '@core';
import { TransactionDialogComponent } from '@modules/main-page';
import { DialogDataInterface } from '@app/shared/interfaces/dialog-data.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        private dialogService: DialogService,
        private walletService: WalletService,
        private dialog: MatDialog
    ) {}
    ngOnInit(): void {}

    public onAddTransactionClick(itemType: string): void {
        this.dialog.open(TransactionDialogComponent, {
            data: { isEditForm: false, itemType },
            disableClose: true,
        });
    }

    public onEditTransactionClick(itemType: string, itemId: string): void {
        this.dialog.open(TransactionDialogComponent, {
            data: { isEditForm: true, itemType, itemId },
            disableClose: true,
        });
    }

    openCreateWalletModal() {
        const options: DialogDataInterface = {
            title: 'Add wallet',
            content: CreateWalletFormComponent,
            width: '500px',
            disableClose: true,
        };

        this.dialogService.open(options);

        this.dialogService
            .confirmed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result) => {
                if (result) {
                    console.log(result);
                    this.walletService.createWallet(result);
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
