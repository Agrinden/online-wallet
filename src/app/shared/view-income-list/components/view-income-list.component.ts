import { IncomeDataService } from './../../../core/services/income-data/income-service';
import { CategoryInterface } from '@app/shared/interfaces/category.interface';
import { IncomeWalletInterface } from './../../interfaces/income-wallet.interface';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'app-view-income',
    templateUrl: './view-income-list.component.html',
    styleUrls: ['./view-income-list.component.scss'],
})
export class ViewIncomeListComponent {
    public filterForm!: FormGroup;

    public wallets$!: Observable<IncomeWalletInterface[]>;
    public categories$!: Observable<CategoryInterface[]>;

    constructor(private formBuilder: FormBuilder, private incomeDataService: IncomeDataService) {}

    ngOnInit(): void {
        this.filterForm = this.getInitializedFilterForm();
        this.wallets$ = this.incomeDataService.getWalletList();
        this.categories$ = this.incomeDataService.getIncomeCategories();
    }

    private getInitializedFilterForm(): FormGroup {
        const form = this.formBuilder.group({
            date: '',
            category: '',
            wallet: '',
        });
        return form;
    }
}
