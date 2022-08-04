import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyInterface } from '@app/shared/interfaces/currency.interface';

@Pipe({
    name: 'filterCurrencyPipe',
})
export class FilterCurrencyPipe implements PipeTransform {
    transform(currencies: CurrencyInterface[], filterValue: string = ''): CurrencyInterface[] {
        return filterValue !== ''
            ? currencies.filter((item) => item.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()))
            : currencies;
    }
}
