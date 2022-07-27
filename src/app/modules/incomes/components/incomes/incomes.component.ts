import { filter } from 'rxjs/operators';
import { IncomeFormComponent } from './../../../../shared/income/components/income.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
    selector: 'app-incomes',
    templateUrl: './incomes.component.html',
    styleUrls: ['./incomes.component.scss'],
})
export class IncomesComponent {
    constructor(private dialog: MatDialog) {}

    public openIncomeForm(): void {
        this.dialog
            .open(IncomeFormComponent)
            .beforeClosed()
            .pipe(filter((data) => !!data))
            .subscribe();
    }
}
