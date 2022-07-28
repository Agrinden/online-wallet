import { WalletService } from '@core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { CreateWalletFormComponent } from '@app/modules/main-page/components/create-wallet-form/create-wallet-form.component';
import { DialogDataInterface } from '@app/shared/interfaces/dialog-data.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(private dialogService: DialogService, private walletService: WalletService) {}

    ngOnInit(): void {}

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
