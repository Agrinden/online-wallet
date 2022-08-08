import { Subject, takeUntil } from 'rxjs';
import { IncomeFormComponent } from '@app/shared';
import { MatDialog } from '@angular/material/dialog';
import { IncomeDataInterface } from '@app/shared';
import { IncomeDataService } from '@app/core';
import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'income-table',
    templateUrl: './income-table.component.html',
    styleUrls: ['income-table.component.scss'],
})
export class IncomeTableComponent implements OnInit, AfterViewInit, OnDestroy {
    public displayedColumns!: string[];
    public dataSource!: MatTableDataSource<IncomeDataInterface>;
    private destroy: Subject<void> = new Subject();

    constructor(private incomeDataService: IncomeDataService, public dialog: MatDialog) {}

    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit() {
        this.incomeDataService
            .getIncomeData()
            .pipe(takeUntil(this.destroy))
            .subscribe((tableData) => {
                this.dataSource = new MatTableDataSource(tableData);
                this.displayedColumns = Object.keys(tableData[0]);
                this.displayedColumns.push('actions');
            });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    public editData(incomeData: IncomeDataInterface): void {
        const dialogRef = this.dialog.open(IncomeFormComponent, { data: incomeData });
        dialogRef.afterClosed().pipe(takeUntil(this.destroy)).subscribe();
    }

    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }
}
