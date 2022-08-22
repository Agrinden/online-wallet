export interface WalletInterface {
    id: number;
    name: string;
    isDefault: boolean;
    currency: string;
    balance: number;
}
