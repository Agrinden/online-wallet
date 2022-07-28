import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { CategoryInterface } from './../../../shared/interfaces/income-category.interface';
import { WalletInterface } from './../../../shared/interfaces/income-wallet.interface';
import { CATEGORIES } from './../../../mocks/categories';
import { WALLETS } from './../../../mocks/wallets';

@Injectable({ providedIn: 'root' })
export class IncomeDataService {
    public getWalletList(): Observable<WalletInterface[]> {
        return of(WALLETS);
    }

    public getIncomeCategories(): Observable<CategoryInterface[]> {
        return of(CATEGORIES);
    }
}
