import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { TransactionDialogComponent } from '@modules/main-page';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject();

    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {}

    public onAddTransactionClick(itemType: string): void {
        this.dialog
            .open(TransactionDialogComponent, {
                data: { isEditForm: false, itemType: itemType },
            })
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }

    public onEditTransactionClick(itemType: string, itemId: string): void {
        this.dialog
            .open(TransactionDialogComponent, { data: { isEditForm: true, itemType: itemType, itemId: itemId } })
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
