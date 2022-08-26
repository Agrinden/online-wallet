import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
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

    public get(transactionType: TransactionTypeEnum): Observable<TransactionInterface[]> {
        const obj: any = {
            transactionsType: transactionType,
            sortBy: 'DATEDESC',
            page: '1',
            size: '10',
        };
        const queryParams = Object.keys(obj)
            .map((key) => `${key}=${obj[key]}`)
            .join('&');
        const url = environment.apiUrl.concat('/transactions?', queryParams);
        return this.http.get<TransactionInterface[]>(`${url}`);
    }

    public getAll(): Observable<TransactionInterface[]> {
        const obj: any = {
            // sortBy: 'DATEDESC',
            page: '0',
            size: '10',
        };
        const queryParams = Object.keys(obj)
            .map((key) => `${key}=${obj[key]}`)
            .join('&');
        const url = environment.apiUrl.concat('/transactions?', queryParams);
        return this.http.get<TransactionInterface[]>(`${url}`);
    }

    public add(incomeData: TransactionDTOInterface): Observable<any> {
        return this.http.post(`${environment.apiUrl}/transactions`, incomeData);
    }

    public edit(incomeData: TransactionDTOInterface, id: string): Observable<any> {
        return this.http.put(`${environment.apiUrl}/transactions/${id}`, incomeData);
    }
}
