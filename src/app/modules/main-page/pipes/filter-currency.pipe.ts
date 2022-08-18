import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterCurrencyPipe',
})
export class FilterCurrencyPipe implements PipeTransform {
    transform(currencies: string[], filterValue: string = ''): string[] {
        return filterValue !== ''
            ? currencies.filter((item) => item.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()))
            : currencies;
    }
}
