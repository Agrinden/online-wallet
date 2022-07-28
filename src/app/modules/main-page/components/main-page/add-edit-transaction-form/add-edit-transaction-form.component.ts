import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IncomeFormInterface } from '@app/shared/interfaces/income-form.interface';
import { TransactionService } from '@modules/main-page';
import * as moment from 'moment';

@Component({
    selector: 'app-add-edit-transaction-form',
    templateUrl: './add-edit-transaction-form.component.html',
    styleUrls: ['./add-edit-transaction-form.component.scss'],
})
export class AddEditTransactionFormComponent implements OnInit {
    @Input() dataForm!: FormGroup<IncomeFormInterface>;
    @Input() data!: any;

    public currentDate!: moment.Moment;
    public categories$ = this.transactionService.categories$;
    public wallets$ = this.transactionService.wallets$;

    constructor(private formBuilder: FormBuilder, private transactionService: TransactionService) {}

    ngOnInit(): void {
        this.dataForm = this.getInitializedForm();
        this.currentDate = moment();
    }

    public isValidField(controlName: keyof IncomeFormInterface): boolean {
        return !this.dataForm.controls[controlName].hasError('pattern');
    }

    public isControlTouched(controlName: keyof IncomeFormInterface): boolean {
        return this.dataForm.controls[controlName].touched;
    }

    public isFormErrorInvalid(): boolean {
        return this.dataForm.touched && this.dataForm.invalid;
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

    public onFormSubmit(): void {
        if (this.dataForm) {
            this.data.isEditForm
                ? this.transactionService.editTransaction(this.dataForm.controls)
                : this.transactionService.createTransaction(this.dataForm.controls);
        }
    }
}
