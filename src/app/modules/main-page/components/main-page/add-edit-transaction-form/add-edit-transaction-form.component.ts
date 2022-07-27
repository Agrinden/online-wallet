import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '@modules/main-page';
import * as moment from 'moment';

@Component({
    selector: 'app-add-edit-transaction-form',
    templateUrl: './add-edit-transaction-form.component.html',
    styleUrls: ['./add-edit-transaction-form.component.scss'],
})
export class AddEditTransactionFormComponent implements OnInit {
    @Input() dataForm!: FormGroup;
    @Input() data!: any;

    public currentDate!: moment.Moment;
    public categories = this.transactionService.categories$;
    public wallets = this.transactionService.wallets$;

    constructor(private formBuilder: FormBuilder, private transactionService: TransactionService) {}

    ngOnInit(): void {
        this.dataForm = this.getInitializedForm();
        this.currentDate = moment();
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

    public onFormSubmit(): void {
        if (this.data) {
            if (this.data.itemType === 'expense') {
                this.data.isEditForm
                    ? this.transactionService.updateTransaction(this.data)
                    : this.transactionService.createTransaction(this.data);
            }
        } else console.log('no data');
    }
}
