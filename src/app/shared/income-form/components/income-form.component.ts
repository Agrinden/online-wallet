import { IncomeDataInterface } from '@app/shared';
import { CategoryService, WalletService } from '@core';
import { ConfirmationDialogChoise } from './../../enums/dialog-enums';
import { closeWarning } from './../../../core/services/user-delete/user-delete-constants';
import { WarningDialogService } from './../../../core/services/warn-dialog/warning-dialog.service';
import { IncomeDataService } from '@app/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { AddCategoryComponent } from '@app/shared';
import { MatDialog } from '@angular/material/dialog';
import { IncomeFormInterface } from '@app/shared';
import { IncomeWalletInterface } from '@app/shared';
import { Observable, takeUntil, Subject } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import * as moment from 'moment';
import { CategoryInterface } from '@app/shared';
import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { DialogDataInterface } from '@app/shared/interfaces/dialog-data.interface';
import { ColorSchemeEnum } from '@app/shared/enums/color-scheme.enum';

@Component({
    selector: 'app-income',
    templateUrl: './income-form.component.html',
    styleUrls: ['./income-form.component.scss'],
})
export class IncomeFormComponent implements OnInit {
    public incomeForm!: FormGroup<IncomeFormInterface>;
    public currentDate!: moment.Moment;
    public income = TransactionTypeEnum.INCOME;
    private defaultColor = ColorSchemeEnum.GREEN;

    //TODO: load wallets from BE
    public wallets$!: Observable<IncomeWalletInterface[]>;
    public categories$!: Observable<CategoryInterface[]>;
    private destroy$ = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private incomeDataService: IncomeDataService,
        private walletService: WalletService,
        @Inject(MAT_DIALOG_DATA) public data: IncomeDataInterface,
        private dialog: MatDialog,
        private warnDialogService: WarningDialogService,
        private dialogService: DialogService,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.incomeForm = this.getInitializedForm(this.data);
        this.wallets$ = this.walletService.getWalletList();
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

    private getInitializedForm(formData: IncomeDataInterface): FormGroup<IncomeFormInterface> {
        const date = formData?.date ? moment(formData.date, 'DD/MM/YYYY') : moment();
        const form = this.formBuilder.group<IncomeFormInterface>({
            wallet: new FormControl<string>(formData?.walletId, Validators.required),
            amount: new FormControl<number>(+formData?.amount || 0.0, [
                Validators.required,
                Validators.pattern(/^[0-9]*[.]?[0-9]+$/),
                Validators.min(0.0),
            ]),
            category: new FormControl<string>(formData?.category, Validators.required),
            date: new FormControl<moment.Moment>(date, Validators.required),
            note: new FormControl<string>(formData?.note, Validators.maxLength(200)),
        });
        return form;
    }

    public formIsChanged(): boolean {
        return this.incomeForm.dirty || this.incomeForm.touched;
    }

    public openConfirmationDialog(): void {
        if (this.formIsChanged()) {
            this.warnDialogService
                .open(closeWarning)
                .pipe(
                    filter((value) => value === ConfirmationDialogChoise.confirm),
                    takeUntil(this.destroy$)
                )
                .subscribe(() => this.dialog.closeAll());
        } else {
            this.dialog.closeAll();
        }
    }

    public createCategory(type: TransactionTypeEnum) {
        const options: DialogDataInterface = {
            title: 'Add Category',
            content: AddCategoryComponent,
            width: '400px',
            disableClose: true,
            data: {
                defaultColor: this.defaultColor,
            },
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
                this.categoryService.create(newCategory);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
