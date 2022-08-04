import { CurrencyInterface } from './currency.interface';

export interface CreateWalletInterface {
    name: string;
    currency: CurrencyInterface;
    isDefault: boolean;
}
