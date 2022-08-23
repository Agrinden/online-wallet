import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencyIcon',
})
export class CurrencyIconPipe implements PipeTransform {
    public transform(value: string): string {
        return this.getCurrencyIcon(value);
    }

    private currencyName = new Map().set('USD', '$').set('EUR', '€').set('GEL', '₾').set('PLN', 'zł');

    private getCurrencyIcon(value: string): string {
        const result = this.currencyName.get(value);
        return result || '';
    }
}
