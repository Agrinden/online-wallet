import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TransactionFormInterface } from '@app/shared';
import { AddCategoryComponent } from '@app/shared/add-category/components/add-category.component';
import { TransactionService } from '@modules/main-page';
import * as moment from 'moment';
import { filter, Subject, take } from 'rxjs';

@Component({
    selector: 'app-add-edit-transaction-form',
    templateUrl: './add-edit-transaction-form.component.html',
    styleUrls: ['./add-edit-transaction-form.component.scss'],
})
export class AddEditTransactionFormComponent implements OnInit {
    @Input() dataForm!: FormGroup<TransactionFormInterface>;
    @Input() data!: any;

    @Output() closeForm = new EventEmitter();

    @ViewChild('selectedCategory') selectedCategory!: string;

    public currentDate!: moment.Moment;
    public categories$ = this.transactionService.categories$;
    public wallets$ = this.transactionService.wallets$;
    public payers$ = this.transactionService.payers$;

    constructor(
        private formBuilder: FormBuilder,
        private transactionService: TransactionService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.currentDate = moment();
        this.dataForm = this.getInitializedForm();
        this.setFormData();
        this.wallets$ = this.transactionService.getWalletList();
        this.categories$ = this.transactionService.getIncomeCategories();
    }

    public isValidField(controlName: keyof TransactionFormInterface): boolean {
        return !this.dataForm.controls[controlName].hasError('pattern');
    }

    public isControlTouched(controlName: keyof TransactionFormInterface): boolean {
        return this.dataForm.controls[controlName].touched;
    }

    public isFormErrorInvalid(): boolean {
        return this.dataForm.touched && this.dataForm.invalid;
    }

    private getInitializedForm(): FormGroup<TransactionFormInterface> {
        const form = this.formBuilder.group<TransactionFormInterface>({
            id: new FormControl<string | null>(''),
            wallet: new FormControl<string>('', Validators.required),
            amount: new FormControl<number>(0.01, [
                Validators.required,
                Validators.pattern(/^[0-9]*[.]?[0-9]+$/),
                Validators.min(0.01),
            ]),
            category: new FormControl<string>('', Validators.maxLength(100)),
            subcategory: new FormControl<string>('', Validators.maxLength(100)),
            payer: new FormControl<string>('', Validators.maxLength(64)),
            date: new FormControl<moment.Moment>(this.currentDate, Validators.maxLength(10)),
            note: new FormControl<string>('', Validators.maxLength(400)),
        });
        return form;
    }

    private setFormData(): void {
        if (this.data.isEditForm) {
            this.transactionService
                .getTransaction(this.data.itemId)
                .pipe(take(1))
                .subscribe((item: any) => {
                    return this.dataForm.patchValue(item);
                });
        }
    }

    public onFormSubmit(): void {
        if (this.dataForm) {
            const formControls = this.dataForm.getRawValue();
            const model = { ...formControls, itemType: this.data.itemType };

            this.data.isEditForm
                ? this.transactionService.editTransaction(model)
                : this.transactionService.createTransaction(model);
        }
    }

    public openAddInstanseForm(): void {
        this.dialog
            .open(AddCategoryComponent)
            .beforeClosed()
            .pipe(
                filter((data) => !!data),
                take(1)
            )
            .subscribe();
    }

    public onFormClose() {
        this.closeForm.emit();
    }
}
