export interface ICreateWallet {
    name: string;
    currency: ICurrency;
    isDefault: boolean;
}
export interface ICurrency {
    name: string;
}
