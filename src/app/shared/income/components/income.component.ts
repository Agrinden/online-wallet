import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { WALLETS } from '../../../mocks/wallets';
import { CATEGORIES } from '../../../mocks/categories';
import * as moment from 'moment';

@Component({
    selector: 'app-income',
    templateUrl: './income.component.html',
    styleUrls: ['./income.component.scss'],
})
export class IncomeComponent implements OnInit {
    public incomeForm!: FormGroup;
    public currentDate!: any;

    //TODO: load wallets from BE
    public wallets = WALLETS;
    public categories = CATEGORIES;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.currentDate = moment();
        this.incomeForm = this.getInitializedForm();
    }

    private getInitializedForm(): FormGroup {
        const form = this.formBuilder.group({
            wallet: ['', Validators.required],
            amount: [0.01, [Validators.required, Validators.pattern(/^[0-9]*[.]?[0-9]+$/), Validators.min(0.01)]],
            category: ['', Validators.required],
            date: [this.currentDate, Validators.required],
            note: ['', Validators.maxLength(200)],
        });
        return form;
    }
}
