import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CURRENCIES } from '@app/mocks';
import { CurrencyInterface } from '@app/shared/interfaces/currency.interface';

@Component({
    selector: 'app-currency-dropdown',
    templateUrl: './currency-dropdown.component.html',
    styleUrls: ['./currency-dropdown.component.scss'],
})
export class CurrencyDropdownComponent {
    @Output() currencyChange = new EventEmitter<CurrencyInterface>();

    public currencyCtrl: FormControl = new FormControl('', [Validators.required]);

    public currencyFilterCtrl: FormControl = new FormControl('');

    public filteredCurrencies: CurrencyInterface[] = CURRENCIES;

    onChange(event: CurrencyInterface) {
        this.currencyChange.emit(event);
    }
}
