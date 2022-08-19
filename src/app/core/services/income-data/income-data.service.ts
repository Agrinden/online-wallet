import { TransactionInterface } from '@app/shared';
import { EXPENSE_DATA } from './../../../mocks/expense-table';
import { INCOME_DATA } from './../../../mocks/table';
import { IncomeDataInterface } from '@app/shared';

import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { CategoryInterface } from '@app/shared';
import { CATEGORIES } from '@app/mocks';

@Injectable({ providedIn: 'root' })
export class IncomeDataService {
    public getIncomeCategories(): Observable<CategoryInterface[]> {
        return of(CATEGORIES);
    }

    public getIncomeData(): Observable<IncomeDataInterface[]> {
        return of(INCOME_DATA);
    }

    public getExpenseData(): Observable<TransactionInterface[]> {
        return of(EXPENSE_DATA);
    }
}
