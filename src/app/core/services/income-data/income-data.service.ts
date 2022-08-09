import { TransactionInterface } from '@app/shared';
import { EXPENSE_DATA } from './../../../mocks/expense-table';
import { INCOME_DATA } from './../../../mocks/table';
import { IncomeDataInterface } from '@app/shared';
import { categories } from '@app/core';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { CategoryInterface } from '@app/shared';

@Injectable({ providedIn: 'root' })
export class IncomeDataService {
    public getIncomeCategories(): Observable<CategoryInterface[]> {
        return of(categories);
    }

    public getIncomeData(): Observable<IncomeDataInterface[]> {
        return of(INCOME_DATA);
    }

    public getExpenseData(): Observable<TransactionInterface[]> {
        return of(EXPENSE_DATA);
    }
}
