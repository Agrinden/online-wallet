import { Component, OnInit } from '@angular/core';
import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { CreateWalletFormComponent } from '@app/modules/wallet/components/create-wallet-form/create-wallet-form.component';
import { IDialogData } from '@app/shared/interfaces/dialog-data.interface';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
    constructor(private dialogService: DialogService) {}

    ngOnInit(): void {}

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
                this.createWallet();
            }
        });
    }
    createWallet() {
        console.log('Saving data');
    }
}
