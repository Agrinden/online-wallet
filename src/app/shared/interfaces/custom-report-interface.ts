import { Moment } from 'moment';

interface IncomeReportItemInterface {
    walletId: string;
    category: string;
    date: number;
    amount: number;
}

interface ExpenseReportItemInterface extends IncomeReportItemInterface {
    payerId: string;
}

export interface ReportInterface {
    income: IncomeReportItemInterface[];
    expense: ExpenseReportItemInterface[];
}

export interface ReportFiltersInterface {
    start: Moment;
    end: Moment;
    payers: { name: string; id: string }[];
    walletsId: { name: string; id: string }[];
    EXPENSECategories: { name: string; id: string }[];
    INCOMECategories: { name: string; id: string }[];
}
