export interface WalletInterface {
    id: string;
    name: string;
    balance: number;
    currencyCode: string;
    isDefault: boolean;
}
