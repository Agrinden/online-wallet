import { TABLE } from './../../../mocks/table';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { CategoryInterface } from './../../../shared/interfaces/income-category.interface';
import { IncomeWalletInterface } from './../../../shared/interfaces/income-wallet.interface';
import { CATEGORIES } from './../../../mocks/categories';
import { WALLETS } from './../../../mocks/wallets';
import { IncomeTableInterface } from '@app/shared/interfaces/income-table.interface';

@Injectable({ providedIn: 'root' })
export class IncomeDataService {
    public getWalletList(): Observable<IncomeWalletInterface[]> {
        return of(WALLETS);
    }

    public getIncomeCategories(): Observable<CategoryInterface[]> {
        return of(CATEGORIES);
    }

    public getIncomeTableData(): Observable<IncomeTableInterface[]> {
        return of(TABLE);
    }
}
