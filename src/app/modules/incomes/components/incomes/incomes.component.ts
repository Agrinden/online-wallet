import { TransactionType } from './../../../../core/constants/transaction-type';
import { EXPENSE_DATA } from './../../../../mocks/expense-table';
import { INCOME_DATA } from './../../../../mocks/table';
import { Component } from '@angular/core';

@Component({
    selector: 'app-incomes',
    templateUrl: './incomes.component.html',
    styleUrls: ['./incomes.component.scss'],
})
export class IncomesComponent {
    public tableTypes = TransactionType;
    public incomes = INCOME_DATA;
}
