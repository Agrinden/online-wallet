import { TransactionDeleteService } from './../../../core/services/income-delete/transaction-delete';
import { IncomeDataService } from '@app/core';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IncomeFormComponent, TransactionInterface } from '@app/shared';
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { TransactionDialogComponent } from './../../../modules/main-page/components/transaction-dialog/transaction-dialog.component';
import { TransactionTypeEnum } from './../../enums/transaction-type.enum';

@Component({
    selector: 'income-table',
    templateUrl: './income-table.component.html',
    styleUrls: ['income-table.component.scss'],
})
export class IncomeTableComponent<T> implements OnInit, AfterViewInit, OnDestroy {
    @Input() tableType = TransactionTypeEnum.INCOME;
    @Input() tableData: TransactionInterface[] = [];
    @ViewChild(MatSort) sort!: MatSort;

    public displayedColumns!: string[];
    public dataSource!: MatTableDataSource<TransactionInterface>;
    public isExpenses!: boolean;
    private destroy: Subject<void> = new Subject();

    constructor(
        public dialog: MatDialog,
        public deleteIncomeService: TransactionDeleteService,
        public incomeDataService: IncomeDataService
    ) {}

    ngOnInit() {
        this.initializeTable(this.tableData);
        this.isExpenses = this.tableType === TransactionTypeEnum.EXPENSE;
    }

    ngAfterViewInit() {
        this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
                case 'date':
                    const date = moment(item.date, 'DD/MM/YYYY');
                    return date.unix();
                default:
                    if ('payer' in item) {
                        const transactionProp = property as keyof TransactionInterface;
                        return +item[transactionProp] || item[transactionProp].toString();
                    }
                    const incomeProp = property as keyof TransactionInterface;
                    return +item[incomeProp] || item[incomeProp].toString();
            }
        };
        this.dataSource.sort = this.sort;
    }

    private initializeTable(tableData: TransactionInterface[]): void {
        this.dataSource = new MatTableDataSource(tableData);
        this.displayedColumns = ['date', 'category', 'amount', 'walletId', 'note', 'actions'];
        if (this.tableType === TransactionTypeEnum.EXPENSE) {
            this.displayedColumns = ['date', 'category', 'amount', 'walletId', 'payer', 'note', 'actions'];
        }
    }

    public editData(rowData: TransactionInterface): void {
        if (rowData.type === TransactionTypeEnum.EXPENSE) {
            const dialogRef = this.dialog.open(TransactionDialogComponent, {
                data: { ...rowData, isEditForm: true, itemId: rowData.id, itemType: TransactionTypeEnum.EXPENSE },
            });
            dialogRef.afterClosed().pipe(takeUntil(this.destroy)).subscribe();
        } else {
            const dialogRef = this.dialog.open(IncomeFormComponent, { data: rowData });
            dialogRef.afterClosed().pipe(takeUntil(this.destroy)).subscribe();
        }
    }

    public deleteIncome(rowData: TransactionInterface): void {
        this.deleteIncomeService.handleOpenDialog(rowData, this.isExpenses);
    }

    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }
}
