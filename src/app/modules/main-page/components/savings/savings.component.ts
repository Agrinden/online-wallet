import { ModalPigComponent } from './../modal-pig/modal-pig.component';
import { takeUntil, Subject } from 'rxjs';
import { DialogService } from './../../../../shared/dialog/services/dialog.service';
import { DialogDataInterface } from './../../../../shared/interfaces/dialog-data.interface';
import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-savings',
    templateUrl: './savings.component.html',
    styleUrls: ['savings.component.scss'],
})
export class SavingsComponent implements OnInit, OnDestroy {
    public total = 0;

    private destroy$ = new Subject();

    constructor(private dialogService: DialogService) {}

    ngOnInit(): void {}

    public addSavings() {
        const options: DialogDataInterface = {
            content: ModalPigComponent,
            width: '350px',
            disableClose: true,
        };

        const dialog = this.dialogService.open(options);
        dialog
            .beforeClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((savingData) => {
                if (savingData && savingData.amount) {
                    this.total += Number(savingData.amount);
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
