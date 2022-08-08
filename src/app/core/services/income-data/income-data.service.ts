import { INCOME_DATA } from './../../../mocks/table';
import { IncomeDataInterface } from './../../../shared/interfaces/income-data.interface';
import { categories } from '../../constants/categories';
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
}
