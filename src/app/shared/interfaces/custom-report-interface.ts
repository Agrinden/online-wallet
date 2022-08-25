import { Moment } from 'moment';

interface IncomeReportItemInterface {
    walletId: string;
    category: string;
    date: number;
    amount: number;
}

interface ExpenseReportItemInterface extends IncomeReportItemInterface {
    payer: string;
}

export interface ReportInterface {
    income: IncomeReportItemInterface[];
    expense: ExpenseReportItemInterface[];
}

export interface ReportFiltersInterface {
    start: Moment;
    end: Moment;
    walletsId: { name: string; id: string }[];
    expenseCategories: { name: string; id: string }[];
    incomeCategories: { name: string; id: string }[];
}
