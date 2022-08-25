import { TransactionInterface } from '@app/shared';
import { IncomeDataService } from '@app/core';
import { TransactionTypeEnum } from './../../../../shared/enums/transaction-type.enum';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-incomes',
    templateUrl: './incomes.component.html',
    styleUrls: ['./incomes.component.scss'],
})
export class IncomesComponent implements OnInit {
    public tableTypes = TransactionTypeEnum;
    public incomes: TransactionInterface[] = [];

    constructor(private incomeDataService: IncomeDataService) {}

    ngOnInit(): void {
        this.incomeDataService
            .get(TransactionTypeEnum.INCOME)
            .subscribe((tableData) => (this.incomes = tableData || []));
    }
}
