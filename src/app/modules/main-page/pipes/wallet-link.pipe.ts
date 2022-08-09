import { Pipe, PipeTransform } from '@angular/core';
import { WalletInterface } from '@app/shared';

@Pipe({
    name: 'walletLink',
    pure: true,
})
export class WalletLinkPipe implements PipeTransform {
    transform(wallet: WalletInterface): string {
        return 'view-wallet/' + wallet.id;
    }
}
