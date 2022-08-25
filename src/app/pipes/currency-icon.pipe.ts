import { Wallet } from '@shared/models/wallet';
import { WalletInterface } from '@app/shared';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencyIcon',
})
export class CurrencyIconPipe implements PipeTransform {
    public transform(value: number | string, wallets?: WalletInterface[]): string {
        if (wallets) {
            const currency = wallets.find((wallet) => wallet.id === value)?.currency || '';
            return this.getCurrencyIcon(currency);
        }
        return this.getCurrencyIcon(value as string);
    }

    private currencyName = new Map().set('USD', '$').set('EUR', '€').set('GEL', '₾').set('PLN', 'zł');

    private getCurrencyIcon(value: string): string {
        const result = this.currencyName.get(value);
        return result || '';
    }
}
