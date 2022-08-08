export interface WalletInterface {
    id: string;
    name: string;
    isDefault: boolean;
    currency: string;
    balance: number;
}
