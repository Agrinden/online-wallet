import { IncomeFormComponent } from './../../income-form/components/income-form.component';
import { MatDialog } from '@angular/material/dialog';
import { IncomeTableInterface } from '@app/shared/interfaces/income-table.interface';
import { IncomeDataService } from './../../../core/services/income-data/income-service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'income-table',
    templateUrl: './income-table.component.html',
    styleUrls: ['income-table.component.scss'],
})
export class IncomeTableComponent implements OnInit, AfterViewInit {
    public displayedColumns!: string[];
    public dataSource!: MatTableDataSource<IncomeTableInterface>;

    constructor(private incomeDataService: IncomeDataService, public dialog: MatDialog) {}

    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit() {
        this.incomeDataService.getIncomeTableData().subscribe((tableData) => {
            this.dataSource = new MatTableDataSource(tableData);
            this.displayedColumns = Object.keys(tableData[0]).filter((key) => key !== 'id');
            this.displayedColumns.push('actions');
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    public editData(incomeData: IncomeTableInterface): void {
        const dialogRef = this.dialog.open(IncomeFormComponent, { data: incomeData });
        dialogRef.afterClosed().subscribe();
    }
}
