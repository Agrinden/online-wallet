import { TransactionTypeEnum } from './../../enums/transaction-type.enum';
import { TransactionDialogComponent } from './../../../modules/main-page/components/transaction-dialog/transaction-dialog.component';
import { Subject, takeUntil } from 'rxjs';
import { IncomeFormComponent, TransactionInterface, IncomeDataInterface } from '@app/shared';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IncomeDeleteService } from '../../../core/services/income-delete/income-delete';
import { IncomeTableInterface } from '@app/shared/interfaces/income-table.interface';
import * as moment from 'moment';

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
    public isRecent!: boolean;
    private destroy: Subject<void> = new Subject();

    constructor(public dialog: MatDialog, public deleteIncomeService: IncomeDeleteService) {}

    ngOnInit() {
        this.initializeTable(this.tableData);
        this.isExpenses = this.tableType === TransactionTypeEnum.EXPENSE;
        this.isRecent = this.tableType === TransactionTypeEnum.RECENT;
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
                        return item[transactionProp];
                    }
                    const incomeProp = property as keyof IncomeDataInterface;
                    return item[incomeProp];
            }
        };
        this.dataSource.sort = this.sort;
    }

    private initializeTable(tableData: IncomeDataInterface[] | TransactionInterface[]): void {
        this.dataSource = new MatTableDataSource(tableData);
        this.displayedColumns = ['date', 'category', 'amount', 'walletId', 'note', 'actions'];
        if (this.tableType === TransactionTypeEnum.EXPENSE || this.tableType === TransactionTypeEnum.RECENT) {
            this.displayedColumns = ['date', 'category', 'amount', 'walletId', 'payer', 'note', 'actions'];
        }
    }

    public editData(rowData: IncomeDataInterface | TransactionInterface): void {
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

    public deleteIncome(rowData: IncomeDataInterface | TransactionInterface): void {
        this.deleteIncomeService.handleOpenDialog(rowData);
    }

    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }
}
