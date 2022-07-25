import { filter } from 'rxjs/operators';
import { IncomeComponent } from './../../../../shared/income/components/income.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
    constructor(private dialog: MatDialog) {}

    public openIncomeForm(): void {
        this.dialog
            .open(IncomeComponent)
            .beforeClosed()
            .pipe(filter((data) => !!data))
            .subscribe();
    }
}
