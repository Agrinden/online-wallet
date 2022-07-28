import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateWalletFormComponent } from '@app/modules/main-page/components/create-wallet-form/create-wallet-form.component';
import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { IDialogData } from '@app/shared/interfaces/dialog-data.interface';
import { WalletService } from '@core';
import { TransactionDialogComponent } from '@modules/main-page';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
    constructor(
        private dialog: MatDialog,
        private dialogService: DialogService,
        private walletService: WalletService
    ) {}

    public onAddTransactionClick(itemType: string): void {
        this.dialog.open(TransactionDialogComponent, {
            data: { isEditForm: false, itemType },
        });
    }

    public onEditTransactionClick(itemType: string, itemId: string): void {
        this.dialog.open(TransactionDialogComponent, {
            data: { isEditForm: true, itemType, itemId },
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
