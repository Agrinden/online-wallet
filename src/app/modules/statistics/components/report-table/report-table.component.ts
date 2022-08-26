import { Component, Input, OnChanges } from '@angular/core';
import { ReportInterface } from '@shared/interfaces/custom-report-interface';

interface ReportTableItemInterface {
    category?: string;
    income?: number;
    expense?: number;
    payerId?: string;
    subTableTitle?: string;
}
interface ColumnInterface {
    dataField: keyof ReportTableItemInterface;
    title: string;
}

@Component({
    selector: 'app-report-table',
    templateUrl: './report-table.component.html',
    styleUrls: ['./report-table.component.scss'],
})
export class ReportTaleComponent implements OnChanges {
    @Input() report?: ReportInterface;
    public readonly columns: ColumnInterface[] = [
        {
            title: '',
            dataField: 'category',
        },
        {
            title: 'Income',
            dataField: 'income',
        },
        {
            title: 'Expense',
            dataField: 'expense',
        },
        {
            title: 'Payer',
            dataField: 'payerId',
        },
    ];
    public readonly displayedColumns = this.columns.map(({ dataField }) => dataField);
    public reportTableData?: ReportTableItemInterface[];

    public ngOnChanges() {
        if (!this.report) {
            return;
        }

        this.reportTableData = [
            { subTableTitle: 'Expense categories' },
            ...this.report.expense.map(({ category, amount, payerId }) => ({ category, payerId, expense: amount })),
            { subTableTitle: 'Incomes categories' },
            ...this.report.income.map(({ category, amount }) => ({ category, income: amount })),
        ];
    }

    public isSubTableRow(index: number, row: any): boolean {
        return !!row.subTableTitle;
    }
}
