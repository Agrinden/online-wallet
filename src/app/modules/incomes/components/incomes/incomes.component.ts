import { TransactionTypeEnum } from './../../../../shared/enums/transaction-type.enum';
import { INCOME_DATA } from './../../../../mocks/table';
import { Component } from '@angular/core';

@Component({
    selector: 'app-incomes',
    templateUrl: './incomes.component.html',
    styleUrls: ['./incomes.component.scss'],
})
export class IncomesComponent {
    public tableTypes = TransactionTypeEnum;
    public incomes = INCOME_DATA;
}
