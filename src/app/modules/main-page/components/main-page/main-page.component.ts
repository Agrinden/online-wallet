import { filter } from 'rxjs/operators';
import { IncomeFormComponent } from './../../../../shared/income/components/income.component';
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
            .open(IncomeFormComponent)
            .beforeClosed()
            .pipe(filter((data) => !!data))
            .subscribe();
    }
}
