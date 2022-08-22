import { TransactionTypeEnum } from './../../enums/transaction-type.enum';
import { TransactionDialogComponent } from './../../../modules/main-page/components/transaction-dialog/transaction-dialog.component';
import { Subject, takeUntil } from 'rxjs';
import { IncomeFormComponent, TransactionInterface } from '@app/shared';
import { MatDialog } from '@angular/material/dialog';
import { IncomeDataInterface } from '@app/shared';
import { IncomeDataService } from '@app/core';
import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TransactionDeleteService } from '../../../core/services/income-delete/transaction-delete';
import { IncomeTableInterface } from '@app/shared/interfaces/income-table.interface';

@Component({
    selector: 'income-table',
    templateUrl: './income-table.component.html',
    styleUrls: ['income-table.component.scss'],
})
export class IncomeTableComponent<T> implements OnInit, AfterViewInit, OnDestroy {
    @Input() tableType = TransactionTypeEnum.INCOME;
    @Input() tableData: IncomeDataInterface[] | TransactionInterface[] = [];
    @ViewChild(MatSort) sort!: MatSort;

    public displayedColumns!: string[];
    public dataSource!: MatTableDataSource<IncomeDataInterface | TransactionInterface>;
    public isExpenses!: boolean;
    private destroy: Subject<void> = new Subject();

    constructor(
        private incomeDataService: IncomeDataService,
        public dialog: MatDialog,
        public deleteIncomeService: TransactionDeleteService
    ) {}

    ngOnInit() {
        this.initializeTable(this.tableData);
        this.isExpenses = this.tableType === TransactionTypeEnum.EXPENSE;
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    private initializeTable(tableData: IncomeDataInterface[] | TransactionInterface[]): void {
        this.dataSource = new MatTableDataSource(tableData);
        this.displayedColumns = ['date', 'category', 'amount', 'walletId', 'note', 'actions'];
        if (this.tableType === TransactionTypeEnum.EXPENSE) {
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
                data: { ...rowData, isEditForm: true, itemId: rowData.id, itemType: TransactionTypeEnum.EXPENSE },
            });
            dialogRef.afterClosed().pipe(takeUntil(this.destroy)).subscribe();
        } else {
            const dialogRef = this.dialog.open(IncomeFormComponent, { data: rowData });
            dialogRef.afterClosed().pipe(takeUntil(this.destroy)).subscribe();
        }
    }

    public deleteIncome(rowData: IncomeDataInterface | TransactionInterface): void {
        this.deleteIncomeService.handleOpenDialog(rowData, this.isExpenses);
    }

    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }
}
