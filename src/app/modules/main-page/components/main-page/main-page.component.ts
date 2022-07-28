import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateWalletFormComponent } from '@app/modules/main-page/components/create-wallet-form/create-wallet-form.component';
import { TransactionFormInterface } from '@app/shared';
import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { IDialogData } from '@app/shared/interfaces/dialog-data.interface';
import { WalletService } from '@core';
import { TransactionDialogComponent, TransactionService } from '@modules/main-page';
import { take } from 'rxjs';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
    constructor(
        private dialog: MatDialog,
        private dialogService: DialogService,
        private walletService: WalletService,
        private transactionService: TransactionService
    ) {}

    public onAddTransactionClick(itemType: string): void {
        this.dialog
            .open(TransactionDialogComponent, {
                data: { isEditForm: false, itemType: itemType },
            })
            .afterClosed()
            .pipe(take(1))
            .subscribe((formData: TransactionFormInterface) => {
                this.transactionService.createTransaction(formData);
            });
    }

    public onEditTransactionClick(itemType: string, itemId: string): void {
        this.dialog
            .open(TransactionDialogComponent, { data: { isEditForm: true, itemType: itemType, itemId: itemId } })
            .afterClosed()
            .pipe(take(1))
            .subscribe((value) => {
                this.transactionService.editTransaction(value);
            });
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
