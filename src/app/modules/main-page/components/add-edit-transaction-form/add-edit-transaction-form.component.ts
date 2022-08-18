import { TransactionTypeEnum } from './../../../../shared/enums/transaction-type.enum';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { payers$, WALLETS } from '@app/core';
import { TransactionFormInterface } from '@app/shared';
import { AddCategoryComponent } from '@app/shared/add-category/components/add-category.component';
import { TransactionService } from '@modules/main-page';
import * as moment from 'moment';
import { filter, Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-add-edit-transaction-form',
    templateUrl: './add-edit-transaction-form.component.html',
    styleUrls: ['./add-edit-transaction-form.component.scss'],
})
export class AddEditTransactionFormComponent implements OnInit {
    public type = TransactionTypeEnum;

    @Input() dataForm!: FormGroup<TransactionFormInterface>;

    @Input() data!: any;

    @Output() closeForm = new EventEmitter();

    public selectedCategory!: string;

    private destroy$ = new Subject();
    public currentDate!: moment.Moment;
    public categories$: Observable<any> = this.transactionService.categories$;
    public wallets$: Observable<any> = WALLETS;
    public payers$: Observable<any> = payers$;

    constructor(
        private formBuilder: FormBuilder,
        private transactionService: TransactionService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.currentDate = moment();
        this.dataForm = this.getInitializedForm();
        if (this.data.isEditForm) {
            this.setFormData(this.data);
        }
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

    public onFormSubmit(): void {
        if (this.dataForm) {
            const formControls = this.dataForm.getRawValue();
            const model = { ...formControls, itemType: this.data.itemType };

            this.data.isEditForm ? this.transactionService.edit(model) : this.transactionService.create(model);
        }
    }

    public openAddInstanseForm(): void {
        this.dialog
            .open(AddCategoryComponent)
            .beforeClosed()
            .pipe(
                filter((data) => !!data),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    public onFormClose() {
        this.closeForm.emit();
    }

    private getInitializedForm(): FormGroup<TransactionFormInterface> {
        const form = this.formBuilder.group<TransactionFormInterface>({
            id: new FormControl<string | null>(''),
            wallet: new FormControl<string>('', Validators.required),
            amount: new FormControl<number>(0.01, [
                Validators.required,
                Validators.pattern(/^(?!0+[1-9])(?:\d+|\d(?:\d)+)(?:[.]\d+)?$/),
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

    private setFormData(formData: any): void {
        this.dataForm.patchValue(formData);
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
