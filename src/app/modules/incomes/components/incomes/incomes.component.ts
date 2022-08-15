import { TransactionTypeEnum } from './../../../../shared/enums/transaction-type.enum';
import { INCOME_DATA } from './../../../../mocks/table';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-incomes',
    templateUrl: './incomes.component.html',
    styleUrls: ['./incomes.component.scss'],
})
export class IncomesComponent implements OnInit {
    public tableTypes = TransactionTypeEnum;
    public incomes = INCOME_DATA;
    public isDataDisable!: boolean;

    constructor() {}

    ngOnInit(): void {
        this.isDataDisable = INCOME_DATA.length === 0;
    }
}
