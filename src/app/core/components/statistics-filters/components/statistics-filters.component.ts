import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService, WalletService } from '@app/core/services';
import { CategoryInterface, WalletInterface } from '@app/shared';
import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { Observable } from 'rxjs';

@Component({
    selector: 'statistics-filters',
    templateUrl: './statistics-filters.component.html',
    styleUrls: ['./statistics-filters.component.scss'],
})
export class StatisticsFiltersComponent implements OnInit {
    public filterForm!: FormGroup;
    public transactionTypeEnum = TransactionTypeEnum;
    public createBtnDis = true;

    public wallets$!: Observable<WalletInterface[]>;
    public categories$!: Observable<CategoryInterface[]>;
    public incomeCategories: CategoryInterface[] = [];
    public expenseCategories: CategoryInterface[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private walletService: WalletService,
        private categoryService: CategoryService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.filterForm = this.getInitializedFilterForm();
        this.wallets$ = this.walletService.getWallets();
        this.categories$ = this.categoryService.get();

        console.log(this.filterForm);
        this.categories$.forEach((categories) => {
            categories.forEach((category) => {
                this[`${category.transactionType}Categories`].push(category);
            });
        });

        this.filterForm.valueChanges.subscribe((formValues) => {
            this.cdr.detectChanges();
            this.createBtnDis = this.checkFormValidation(formValues);
        });
    }

    private getInitializedFilterForm(): FormGroup {
        const form = this.formBuilder.group({
            wallets: [''],
            start: null,
            end: null,
            incomeCategories: [''],
            expenseCategories: [''],
        });
        return form;
    }

    public toggleAllSelection(key: TransactionTypeEnum) {
        const newObj = this.filterForm.value;
        const allIndex = newObj[`${key}Categories`].indexOf('All categories');

        if (
            (allIndex >= 0 ? newObj[`${key}Categories`].length - 1 : newObj[`${key}Categories`].length) !==
            this[`${key}Categories`].length
        ) {
            this.filterForm.setValue({
                ...this.filterForm.value,
                [`${key}Categories`]: ['All categories'].concat(this[`${key}Categories`].map((el) => el.name)),
            });
        } else {
            this.filterForm.setValue({
                ...this.filterForm.value,
                [`${key}Categories`]: [''],
            });
        }
    }

    private checkFormValidation(formValues: FormGroup): boolean {
        for (const key in formValues) {
            if (Object.prototype.hasOwnProperty.call(formValues, key)) {
                const element = formValues[key as keyof typeof formValues];

                switch (key) {
                    case 'wallet':
                        if (element.length === 0) return true;
                        break;
                    case 'start':
                        if (!element || !element?._isValid) return true;
                        break;
                    case 'end':
                        if (!element || !element?._isValid) return true;
                        break;
                    case 'incomeCategories':
                        if (element.length === 0) return true;
                        break;
                    case 'expenseCategories':
                        if (element.length === 0) return true;
                        break;
                    default:
                        break;
                }
            }
        }
        return false;
    }

    public createFilters(): void {
        console.log(this.filterForm);
    }

    public resetFilters(): void {
        console.log(this.createBtnDis);
        this.createBtnDis = true;
        this.filterForm = this.getInitializedFilterForm();
        console.log(this.createBtnDis);
    }
}
