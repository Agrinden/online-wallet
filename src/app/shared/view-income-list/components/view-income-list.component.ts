import { WalletService } from '@core';
import { IncomeDataService } from '@app/core';
import { CategoryInterface, WalletInterface } from '@app/shared';
import { IncomeWalletInterface } from '@app/shared';
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

    public wallets$!: Observable<WalletInterface[]>;
    public categories$!: Observable<CategoryInterface[]>;

    constructor(
        private formBuilder: FormBuilder,
        private incomeDataService: IncomeDataService,
        private walletService: WalletService
    ) {}

    ngOnInit(): void {
        this.filterForm = this.getInitializedFilterForm();
        this.wallets$ = this.walletService.getWallets();
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
