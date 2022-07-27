import { Injectable } from '@angular/core';

import { CoreModule } from '@core/core.module';
import { Observable, of } from 'rxjs';

import { CategoryInterface } from './../../../shared/interfaces/income-category.interface';
import { WalletInterface } from './../../../shared/interfaces/income-wallet.interface';
import { CATEGORIES } from './../../../mocks/categories';
import { WALLETS } from './../../../mocks/wallets';

@Injectable()
export class IncomeDataServie {
    public getWalletList(): Observable<WalletInterface[]> {
        return of(WALLETS);
    }

    public getIncomeCategories(): Observable<CategoryInterface[]> {
        return of(CATEGORIES);
    }
}
