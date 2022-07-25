export interface ICreateWallet {
    name: string;
    amount: number;
    currency: ICurrency[];
    isDefault: boolean;
}
export interface ICurrency {
    name: string;
}
