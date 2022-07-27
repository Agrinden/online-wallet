import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CurrencyInterface } from '@app/shared/interfaces/currency.interface';

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

    public onCurrencyChange(event: CurrencyInterface): void {
        this.form.get('currency')?.setValue(event.name);
    }

    public onSubmit(): void {
        if (!this.form.invalid) {
            this.formSubmit.emit(this.form.value);
        }
    }

    public onCancel(): void {
        this.form.reset();
    }

    public onSlideToggle(event: MatSlideToggleChange) {
        this.form.get('isDefault')?.setValue(event.checked);
    }
}
