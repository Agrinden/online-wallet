import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService, CategoryWrapperService, IncomeDataService, payers$ } from '@app/core';
import {
    CategoryInterface,
    TransactionDTOInterface,
    TransactionFormInterface,
    TransactionInterface,
    WalletInterface,
} from '@app/shared';
import { AddCategoryComponent } from '@app/shared/add-category/components/add-category.component';
import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { ColorSchemeEnum } from '@app/shared/enums/color-scheme.enum';
import { DialogDataInterface } from '@app/shared/interfaces/dialog-data.interface';
import { WalletService } from '@core';
import { TransactionService } from '@modules/main-page';
import * as moment from 'moment';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { TransactionTypeEnum } from './../../../../shared/enums/transaction-type.enum';

@Component({
    selector: 'app-add-edit-transaction-form',
    templateUrl: './add-edit-transaction-form.component.html',
    styleUrls: ['./add-edit-transaction-form.component.scss'],
})
export class AddEditTransactionFormComponent implements OnInit, AfterViewInit, OnDestroy {
    public type = TransactionTypeEnum;

    @Input() dataForm!: FormGroup<TransactionFormInterface>;

    @Input() data!: any;

    @Output() closeForm = new EventEmitter();

    public selectedCategory!: CategoryInterface | null | undefined;

    private defaultColor = ColorSchemeEnum.GREEN;

    private destroy$ = new Subject();
    public currentDate!: moment.Moment;
    public categories$!: Observable<CategoryInterface[]>;
    public wallets: WalletInterface[] = [];
    public payers$: Observable<any> = payers$;

    constructor(
        private walletService: WalletService,
        private formBuilder: FormBuilder,
        private incomeDataService: IncomeDataService,
        private transactionService: TransactionService,
        private dialogService: DialogService,
        private categoryService: CategoryWrapperService
    ) {}

    ngOnInit(): void {
        this.currentDate = moment();
        this.dataForm = this.getInitializedForm(this.data);
        this.walletService
            .getWallets()
            .pipe(takeUntil(this.destroy$))
            .subscribe((wallets) => (this.wallets = wallets));
        this.setFormData();
        this.categories$ = this.categoryService.getExpenses();
    }

    ngAfterViewInit() {
        this.onCategorySelect();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    public isValidField(controlName: keyof TransactionFormInterface): boolean {
        return this.dataForm.controls[controlName].hasError('pattern');
    }

    public isControlTouched(controlName: keyof TransactionFormInterface): boolean {
        return this.dataForm.controls[controlName].touched;
    }

    public isFormErrorInvalid(): boolean {
        return this.dataForm.touched && this.dataForm.invalid;
    }

    public addExpense(): void {
        if (this.dataForm && this.dataForm.valid) {
            const expenseFormData = this.dataForm.value as any;
            const expenseData: TransactionDTOInterface = {
                amount: String(expenseFormData.amount),
                category: {
                    id: expenseFormData.category?.id ? expenseFormData.category?.id : '',
                    categoryType: TransactionTypeEnum.EXPENSE,
                    color: '',
                    name: '',
                },
                date: moment(expenseFormData.date).format('YYYY-MM-DD'),
                notes: expenseFormData.note,
                payer: String(expenseFormData.payer),
                subcategory: String(expenseFormData.subcategory?.name),
                transactionType: TransactionTypeEnum.EXPENSE,
                walletId: expenseFormData.wallet ? expenseFormData.wallet : '',
            };
            this.incomeDataService.add(expenseData).subscribe();
        }
    }

    public createCategory(type: TransactionTypeEnum) {
        const options: DialogDataInterface = {
            title: 'Add Category',
            content: AddCategoryComponent,
            width: '400px',
            disableClose: true,
        };

        const dialog = this.dialogService.open(options);

        this.dialogService
            .confirmed(dialog)
            .pipe(
                takeUntil(this.destroy$),
                filter((res) => !!res)
            )
            .subscribe((category) => {
                if (!category.colorScheme) {
                    category.colorScheme = this.defaultColor;
                }
                const newCategory = { ...category, transactionType: type };
                this.categoryService.create(newCategory, type);
            });
    }

    public createPayer() {
        //TODO as should
        const options: DialogDataInterface = {
            title: 'Add Payer',
            content: AddCategoryComponent,
            width: '400px',
            disableClose: true,
        };

        this.dialogService.open(options);
    }

    public onCategorySelect() {
        this.dataForm.controls['category'].valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
            next: (selectedValue) => {
                this.selectedCategory = selectedValue;
            },
        });
    }

    public onFormClose() {
        this.closeForm.emit();
    }

    public get currency(): string {
        return this.dataForm.get('wallet')?.value || '';
    }

    private getInitializedForm(formData: TransactionInterface): FormGroup<TransactionFormInterface> {
        const date = formData?.date ? moment(formData?.date, 'DD/MM/YYYY') : moment();
        const form = this.formBuilder.group<TransactionFormInterface>({
            id: new FormControl<string | null>(formData?.id),
            wallet: new FormControl<string>(formData?.walletId, Validators.required),
            amount: new FormControl<number | null>(+formData?.amount | 0, [
                Validators.required,
                Validators.pattern(/^(?!0+[1-9])(?:\d+|\d(?:\d)+)(?:[.]\d+)?$/),
                Validators.min(0),
            ]),

            category: new FormControl<CategoryInterface | null>(formData?.category, Validators.maxLength(100)),
            subcategory: new FormControl<CategoryInterface | null>(formData?.subcategory, Validators.maxLength(100)),
            payer: new FormControl<string>(formData?.payer, Validators.maxLength(64)),
            date: new FormControl<moment.Moment>(date, Validators.maxLength(10)),
            note: new FormControl<string>(formData.note, Validators.maxLength(400)),
        });
        return form;
    }

    private setFormData(): void {
        if (this.data.isEditForm) {
            this.transactionService
                .get(this.data.itemId)
                .pipe(takeUntil(this.destroy$))
                .subscribe((item: any) => {
                    return this.dataForm.patchValue(item);
                });
        }
    }
}
