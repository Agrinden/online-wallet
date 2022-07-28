import { IncomeFormInterface } from '../../interfaces/income-form.interface';
import { IncomeDataServie } from '../../../core/services/income-data/income-service';
import { WalletInterface } from '../../interfaces/income-wallet.interface';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormControlStatus, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import * as moment from 'moment';
import { CategoryInterface } from '@app/shared/interfaces/income-category.interface';

@Component({
    selector: 'app-income',
    templateUrl: './income-form.component.html',
    styleUrls: ['./income-form.component.scss'],
})
export class IncomeFormComponent implements OnInit {
    public incomeForm!: FormGroup<IncomeFormInterface>;
    public currentDate!: moment.Moment;

    //TODO: load wallets from BE
    public wallets$!: Observable<WalletInterface[]>;
    public categories$!: Observable<CategoryInterface[]>;

    constructor(private formBuilder: FormBuilder, private incomeDataService: IncomeDataServie) {}

    ngOnInit(): void {
        this.currentDate = moment();
        this.incomeForm = this.getInitializedForm();
        this.wallets$ = this.incomeDataService.getWalletList();
        this.categories$ = this.incomeDataService.getIncomeCategories();
    }

    public isValidField(controlName: keyof IncomeFormInterface): boolean {
        return !this.incomeForm.controls[controlName].hasError('pattern');
    }

    public isControlTouched(controlName: keyof IncomeFormInterface): boolean {
        return this.incomeForm.controls[controlName].touched;
    }

    public isFormErrorInvalid(): boolean {
        return this.incomeForm.touched && this.incomeForm.invalid;
    }

    private getInitializedForm(): FormGroup<IncomeFormInterface> {
        const form = this.formBuilder.group<IncomeFormInterface>({
            wallet: new FormControl<string>('', Validators.required),
            amount: new FormControl<number>(0.01, [
                Validators.required,
                Validators.pattern(/^[0-9]*[.]?[0-9]+$/),
                Validators.min(0.01),
            ]),
            category: new FormControl<string>('', Validators.required),
            date: new FormControl<moment.Moment>(this.currentDate, Validators.required),
            note: new FormControl<string>('', Validators.maxLength(200)),
        });
        return form;
    }
}
