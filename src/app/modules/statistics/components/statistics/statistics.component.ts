import { Component } from '@angular/core';
import { ReportFiltersInterface, ReportInterface } from '@shared/interfaces/custom-report-interface';
import { mockReport } from '@app/mocks';
import * as moment from 'moment';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
    public filters: ReportFiltersInterface | null = null;
    public readonly report: ReportInterface = { expense: [], income: [] };

    public setFilters(filters: ReportFiltersInterface) {
        this.filters = filters;
        // console.log(moment(filters.start).format('X'));

        this.report.expense = mockReport.expense.filter((expense) => {
            const expenseFilter = filters.expenseCategories.some((el) => el.name === expense.category);
            if (!expenseFilter) return false;
            const fitDate =
                +moment(filters.start).format('X') <= expense.date && +moment(filters.end).format('X') >= expense.date;
            if (!fitDate) return false;
            const walletFilter = filters.walletsId.some((el) => el.id === expense.walletId);
            if (!walletFilter) return false;

            return true;
        });

        this.report.income = mockReport.income.filter((income) => {
            const expenseFilter = filters.incomeCategories.some((el) => el.name === income.category);
            if (!expenseFilter) return false;
            const fitDate =
                +moment(filters.start).format('X') <= income.date && +moment(filters.end).format('X') >= income.date;
            if (!fitDate) return false;
            const walletFilter = filters.walletsId.some((el) => el.id === income.walletId);
            if (!walletFilter) return false;

            return true;
        });
    }
}
