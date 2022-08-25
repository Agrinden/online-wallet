interface IncomeReportItemInterface {
    category: string;
    amount: number;
}

interface ExpenseReportItemInterface extends IncomeReportItemInterface {
    payer: string;
}

export interface ReportInterface {
    income: IncomeReportItemInterface[];
    expense: ExpenseReportItemInterface[];
}
