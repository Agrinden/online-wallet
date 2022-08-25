import { AbstractControl } from '@angular/forms';
import { Moment } from 'moment';
import { CategoryInterface } from './categories/category.interface';

export interface IncomeFormInterface {
    walletId: AbstractControl<number | null>;
    amount: AbstractControl<number | null>;
    category: AbstractControl<CategoryInterface | null>;
    date: AbstractControl<Moment | null>;
    note: AbstractControl<string | null>;
}
