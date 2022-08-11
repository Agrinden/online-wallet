import { ModalPigComponent } from './../modal-pig/modal-pig.component';
import { takeUntil, Subject } from 'rxjs';
import { DialogService } from './../../../../shared/dialog/services/dialog.service';
import { DialogDataInterface } from './../../../../shared/interfaces/dialog-data.interface';
import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-savings',
    templateUrl: './savings.component.html',
    styleUrls: ['savings.component.scss'],
})
export class SavingsComponent implements OnInit {
    public total = 0;
    constructor(private dialogService: DialogService) {}

    ngOnInit(): void {}

    public addSavings() {
        const options: DialogDataInterface = {
            content: ModalPigComponent,
            width: '350px',
            disableClose: true,
        };

        const dialog = this.dialogService.open(options);
        dialog.beforeClosed().subscribe((savingData) => {
            if (savingData && savingData.amount) {
                this.total += Number(savingData.amount);
            }
        });
    }
}
