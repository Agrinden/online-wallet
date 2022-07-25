import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ICurrency } from '@app/shared/interfaces/create-wallet.interface';

@Component({
    selector: 'app-create-wallet-form',
    templateUrl: './create-wallet-form.component.html',
    styleUrls: ['./create-wallet-form.component.scss'],
})
export class CreateWalletFormComponent implements OnInit {
    form: FormGroup = new FormGroup({});

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
            currency: [null, [Validators.required]],
            isDefault: [false],
        });
    }

    currencyChange(event: ICurrency) {
        this.form.get('currency')?.setValue(event.name);
    }

    onSubmit() {
        if (this.form.invalid) {
            return;
        }
        console.log(this.form.value);
    }

    onCancel() {
        this.form.reset();
    }
}
