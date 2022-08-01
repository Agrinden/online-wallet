import { IncomeDataService } from './../../../core/services/income-data/income-service';
import { IncomeTableInterface } from '@app/shared/interfaces/income-table.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { AddCategoryComponent } from './../../add-category/components/add-category.component';
import { MatDialog } from '@angular/material/dialog';
import { IncomeFormInterface } from '../../interfaces/income-form.interface';
import { IncomeWalletInterface } from '../../interfaces/income-wallet.interface';
import { Observable } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
    public wallets$!: Observable<IncomeWalletInterface[]>;
    public categories$!: Observable<CategoryInterface[]>;

    constructor(
        private formBuilder: FormBuilder,
        private incomeDataService: IncomeDataService,
        @Inject(MAT_DIALOG_DATA) public data: IncomeTableInterface,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.incomeForm = this.getInitializedForm(this.data);
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

    private getInitializedForm(formData: IncomeTableInterface): FormGroup<IncomeFormInterface> {
        const date = formData?.date ? moment(formData.date, 'DD/MM/YYYY') : moment();
        const form = this.formBuilder.group<IncomeFormInterface>({
            wallet: new FormControl<string>(formData?.wallet, Validators.required),
            amount: new FormControl<number>(+formData?.amount || 0.01, [
                Validators.required,
                Validators.pattern(/^[0-9]*[.]?[0-9]+$/),
                Validators.min(0.01),
            ]),
            category: new FormControl<string>(formData?.category, Validators.required),
            date: new FormControl<moment.Moment>(date, Validators.required),
            note: new FormControl<string>(formData?.note, Validators.maxLength(200)),
        });
        return form;
    }

    public openForm(): void {
        this.dialog
            .open(AddCategoryComponent)
            .beforeClosed()
            .pipe(filter((data) => !!data))
            .subscribe();
    }
}
