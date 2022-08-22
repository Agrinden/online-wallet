import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { TransactionDTOInterface, TransactionInterface } from '@app/shared';
import { EXPENSE_DATA } from './../../../mocks/expense-table';
import { INCOME_DATA } from './../../../mocks/table';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { CategoryInterface } from '@app/shared';
import { CATEGORIES } from '@app/mocks';

@Injectable({ providedIn: 'root' })
export class IncomeDataService {
    constructor(private http: HttpClient) {}

    public getIncomeCategories(): Observable<CategoryInterface[]> {
        return of(CATEGORIES);
    }

    public getIncomeData(): Observable<TransactionInterface[]> {
        return of(INCOME_DATA);
    }

    public getExpenseData(): Observable<TransactionInterface[]> {
        return of(EXPENSE_DATA);
    }

    public add(incomeData: TransactionDTOInterface): Observable<any> {
        return this.http.post(`${environment.apiUrl}/transactions`, incomeData);
    }
}
