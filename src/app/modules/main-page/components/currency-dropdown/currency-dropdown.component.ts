import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CURRENCIES } from '@app/mocks';

@Component({
    selector: 'app-currency-dropdown',
    templateUrl: './currency-dropdown.component.html',
    styleUrls: ['./currency-dropdown.component.scss'],
})
export class CurrencyDropdownComponent {
    @Output() currencyChange = new EventEmitter<string>();

    public currencyCtrl: FormControl = new FormControl('', [Validators.required]);

    public currencyFilterCtrl: FormControl = new FormControl('');

    public filteredCurrencies: string[] = CURRENCIES;

    onChange(event: string) {
        this.currencyChange.emit(event);
    }
}
