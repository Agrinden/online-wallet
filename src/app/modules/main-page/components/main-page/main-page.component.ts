import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IExpense } from '@app/shared';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
    constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: IExpense) {}

    ngOnInit(): void {}

    onAddButtonClick(): void {}
}
