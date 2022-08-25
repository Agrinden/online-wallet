import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService, WalletService } from '@app/core/services';
import { mockPayers } from '@app/mocks';
import { CategoryInterface, WalletInterface } from '@app/shared';
import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { Observable } from 'rxjs';

@Component({
    selector: 'statistics-filters',
    templateUrl: './statistics-filters.component.html',
    styleUrls: ['./statistics-filters.component.scss'],
})
export class StatisticsFiltersComponent implements OnInit {
    @Output() setFilters = new EventEmitter();

    public filterForm!: FormGroup;
    public transactionTypeEnum = TransactionTypeEnum;
    public createBtnDis = true;

    private wallets$!: Observable<WalletInterface[]>;
    private categories$!: Observable<CategoryInterface[]>;

    public incomeCategories: { name: string; id: string }[] = [];
    public expenseCategories: { name: string; id: string }[] = [];
    public walletsList: { name: string; id: string }[] = [];
    public payers = mockPayers;

    constructor(
        private formBuilder: FormBuilder,
        private walletService: WalletService,
        private categoryService: CategoryService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.filterForm = this.getInitializedFilterForm();
        this.wallets$ = this.walletService.getWalletList();
        this.categories$ = this.categoryService.get();

        this.wallets$.forEach((wallets) => {
            this.walletsList = wallets.map((wallet) => ({ name: wallet.name, id: wallet.id }));
        });

        this.categories$.forEach((categories) => {
            categories.forEach((category) => {
                this[`${category.transactionType}Categories`].push({ name: category.name, id: category.id });
            });
        });

        if (this.incomeCategories.length > 0)
            this.incomeCategories.unshift({
                id: '0',
                name: 'All categories',
            });

        if (this.expenseCategories.length > 0)
            this.expenseCategories.unshift({
                id: '0',
                name: 'All categories',
            });

        this.filterForm.valueChanges.subscribe((formValues) => {
            this.cdr.detectChanges();
            this.createBtnDis = this.checkFormValidation(formValues);
        });
    }

    private getInitializedFilterForm(): FormGroup {
        const form = this.formBuilder.group({
            walletsId: [''],
            payers: [''],
            start: null,
            end: null,
            incomeCategories: [''],
            expenseCategories: [''],
        });
        return form;
    }

    public toggleAllSelection(key: TransactionTypeEnum, elementId: string) {
        const newObj = this.filterForm.value;
        const isAllExists = newObj[`${key}Categories`].some((el: { name: string; id: string }) => el.id === '0');

        if (elementId === '0') {
            if (isAllExists) {
                this.filterForm.setValue({
                    ...this.filterForm.value,
                    [`${key}Categories`]: this[`${key}Categories`],
                });
            } else {
                this.filterForm.setValue({
                    ...this.filterForm.value,
                    [`${key}Categories`]: [''],
                });
            }
        } else {
            if (isAllExists && newObj[`${key}Categories`].length === this[`${key}Categories`].length - 1) {
                this.filterForm.setValue({
                    ...this.filterForm.value,
                    [`${key}Categories`]: newObj[`${key}Categories`].slice(1),
                });
            } else if (!isAllExists && newObj[`${key}Categories`].length === this[`${key}Categories`].length - 1) {
                this.filterForm.setValue({
                    ...this.filterForm.value,
                    [`${key}Categories`]: this[`${key}Categories`],
                });
            }
        }
    }

    private checkFormValidation(formValues: FormGroup): boolean {
        for (const key in formValues) {
            if (Object.prototype.hasOwnProperty.call(formValues, key)) {
                const element = formValues[key as keyof typeof formValues];

                switch (key) {
                    case 'wallet':
                    case 'incomeCategories':
                    case 'expenseCategories':
                    case 'payerId':
                        if (element.length === 0) return true;
                        break;
                    case 'start':
                    case 'end':
                        if (!element || !element?._isValid) return true;
                        break;
                    default:
                        break;
                }
            }
        }
        return false;
    }

    public createFilters(): void {
        this.setFilters.emit(this.filterForm.value);
    }

    public resetFilters(): void {
        this.filterForm = this.getInitializedFilterForm();
        this.createBtnDis = true;
    }
}
