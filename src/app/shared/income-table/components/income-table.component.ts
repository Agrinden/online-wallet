import { TransactionDialogComponent } from './../../../modules/main-page/components/transaction-dialog/transaction-dialog.component';
import { TransactionType } from '@app/core';
import { Subject, takeUntil } from 'rxjs';
import { IncomeFormComponent, TransactionInterface } from '@app/shared';
import { MatDialog } from '@angular/material/dialog';
import { IncomeDataInterface } from '@app/shared';
import { IncomeDataService } from '@app/core';
import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'income-table',
    templateUrl: './income-table.component.html',
    styleUrls: ['income-table.component.scss'],
})
export class IncomeTableComponent<T> implements OnInit, AfterViewInit, OnDestroy {
    @Input() tableType = TransactionType.income;
    @Input() tableData: IncomeDataInterface[] | TransactionInterface[] = [];
    @ViewChild(MatSort) sort!: MatSort;

    public displayedColumns!: string[];
    public dataSource!: MatTableDataSource<IncomeDataInterface | TransactionInterface>;
    public isExpenses!: boolean;
    private destroy: Subject<void> = new Subject();

    constructor(private incomeDataService: IncomeDataService, public dialog: MatDialog) {}

    ngOnInit() {
        this.initializeTable(this.tableData);
        this.isExpenses = this.tableType === TransactionType.expense;
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    private initializeTable(tableData: IncomeDataInterface[] | TransactionInterface[]): void {
        this.dataSource = new MatTableDataSource(tableData);
        this.displayedColumns = ['date', 'category', 'amount', 'walletId', 'note', 'actions'];
        if (this.tableType === TransactionType.expense) {
            this.displayedColumns = [
                'date',
                'category',
                'subcategory',
                'amount',
                'walletId',
                'payer',
                'note',
                'actions',
            ];
        }
    }

    public editData(rowData: IncomeDataInterface | TransactionInterface): void {
        if ('payer' in rowData) {
            const dialogRef = this.dialog.open(TransactionDialogComponent, {
                data: { ...rowData, isEditForm: true, itemId: rowData.id, itemType: TransactionType.expense },
            });
            dialogRef.afterClosed().pipe(takeUntil(this.destroy)).subscribe();
        } else {
            const dialogRef = this.dialog.open(IncomeFormComponent, { data: rowData });
            dialogRef.afterClosed().pipe(takeUntil(this.destroy)).subscribe();
        }
    }

    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }
}
