import { AbstractControl } from '@angular/forms';
import { Moment } from 'moment';

export interface IncomeFormInterface {
    wallet: AbstractControl<string | null>;
    amount: AbstractControl<number | null>;
    category: AbstractControl<string | null>;
    date: AbstractControl<Moment | null>;
    note: AbstractControl<string | null>;
}
