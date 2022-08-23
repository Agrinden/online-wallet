import { Component } from '@angular/core';
import { ReportInterface } from '@shared/interfaces/custom-report-interface';
import { mockReport } from '@app/mocks';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
    public readonly report: ReportInterface = mockReport;
}
