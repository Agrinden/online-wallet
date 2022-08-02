import { categories } from './../../constants/categories';
import { TABLE } from './../../../mocks/table';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { CategoryInterface } from './../../../shared/interfaces/category.interface';
import { IncomeWalletInterface } from './../../../shared/interfaces/income-wallet.interface';
import { WALLETS } from './../../../mocks/wallets';
import { IncomeTableInterface } from '@app/shared/interfaces/income-table.interface';

@Injectable({ providedIn: 'root' })
export class IncomeDataService {
    public getWalletList(): Observable<IncomeWalletInterface[]> {
        return of(WALLETS);
    }

    public getIncomeCategories(): Observable<CategoryInterface[]> {
        return of(categories);
    }

    public getIncomeTableData(): Observable<IncomeTableInterface[]> {
        return of(TABLE);
    }
}
