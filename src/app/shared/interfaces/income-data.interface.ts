import { CategoryInterface } from './categories/category.interface';

export interface IncomeDataInterface {
    id: number;
    type: string;
    date: string;
    category: CategoryInterface;
    amount: number;
    walletId: string;
    note: string;
}
