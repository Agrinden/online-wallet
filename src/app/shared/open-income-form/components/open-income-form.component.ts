import { IncomeFormComponent } from './../../income-form/components/income-form.component';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
    selector: 'open-income-form',
    templateUrl: './open-income-form.component.html',
    styleUrls: ['./open-income-form.component.scss'],
})
export class OpenIncomeFormComponent {
    constructor(private dialog: MatDialog) {}

    public openForm(): void {
        this.dialog
            .open(IncomeFormComponent)
            .beforeClosed()
            .pipe(filter((data) => !!data))
            .subscribe();
    }
}
