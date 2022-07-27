import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { CURRENCIES } from '@app/mocks';
import { ICurrency } from '@app/shared/interfaces/create-wallet.interface';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';

@Component({
    selector: 'app-currency-dropdown',
    templateUrl: './currency-dropdown.component.html',
    styleUrls: ['./currency-dropdown.component.scss'],
})
export class CurrencyDropdownComponent implements OnInit {
    @Output() currencyChange = new EventEmitter<ICurrency>();

    protected currencies: ICurrency[] = CURRENCIES;

    public currencyCtrl: FormControl = new FormControl('', [Validators.required]);

    public currencyFilterCtrl: FormControl = new FormControl('', [Validators.required]);

    public filteredCurrencies: ReplaySubject<ICurrency[]> = new ReplaySubject<ICurrency[]>(1);

    @ViewChild('currencySelect', { static: true }) currencySelect!: MatSelect;

    protected onDestroy = new Subject<void>();

    constructor() {}

    ngOnInit() {
        this.filteredCurrencies.next(this.currencies.slice());

        this.currencyFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
            this.filterCurrencies();
        });
    }

    ngAfterViewInit() {
        this.setInitialValue();
    }

    ngOnDestroy() {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    protected setInitialValue() {
        this.filteredCurrencies.pipe(take(1), takeUntil(this.onDestroy)).subscribe(() => {
            this.currencySelect.compareWith = (a: ICurrency, b: ICurrency) => a && b && a.name === b.name;
        });
    }

    protected filterCurrencies() {
        if (!this.currencies) {
            return;
        }

        let search = this.currencyFilterCtrl.value;
        if (!search) {
            this.filteredCurrencies.next(this.currencies.slice());
            return;
        } else {
            search = search.toLowerCase();
        }

        this.filteredCurrencies.next(
            this.currencies.filter((currency) => currency.name.toLowerCase().indexOf(search) > -1)
        );
    }

    onChange(event: ICurrency) {
        this.currencyChange.emit(event);
    }
}
