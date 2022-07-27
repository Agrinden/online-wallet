import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICurrency } from '@app/shared/interfaces/create-wallet.interface';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-create-wallet-form',
    templateUrl: './create-wallet-form.component.html',
    styleUrls: ['./create-wallet-form.component.scss'],
})
export class CreateWalletFormComponent implements OnInit {
    @Output() formSubmit = new EventEmitter<any>();

    form: FormGroup = new FormGroup({});

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
            currency: [null, [Validators.required]],
            isDefault: [false],
        });
    }

    currencyChange(event: ICurrency): void {
        this.form.get('currency')?.setValue(event.name);
    }

    onSubmit(): void {
        if (this.form.invalid) {
            return;
        }
        this.formSubmit.emit(this.form.value);
    }

    onCancel(): void {
        this.form.reset();
    }

    onSlideToggle(event: MatSlideToggleChange) {
        this.form.get('isDefault')?.setValue(event.checked);
    }
}
