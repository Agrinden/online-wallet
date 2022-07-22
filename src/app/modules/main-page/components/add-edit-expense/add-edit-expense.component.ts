import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-add-edit-expense',
    templateUrl: './add-edit-expense.component.html',
    styleUrls: ['./add-edit-expense.component.scss'],
})
export class AddEditExpenseComponent implements OnInit {
    public isEditForm!: boolean;

    constructor() {}

    ngOnInit(): void {}
}
