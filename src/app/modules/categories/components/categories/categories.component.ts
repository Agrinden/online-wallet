import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { Component } from '@angular/core';
import { CategoryInterface } from '@app/shared';
import { Observable, Subject, takeUntil, filter } from 'rxjs';
import { DialogDataInterface } from '@app/shared/interfaces/dialog-data.interface';
import { AddCategoryComponent } from '@app/shared/add-category/components/add-category.component';
import {
    CategoryService,
    deleteCategoryMessage,
    deleteCategorySuccessMessage,
    EditCategorySuccessMessage,
    SnackbarService,
} from '@app/core';
import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { ColorSchemeEnum } from '@app/shared/enums/color-scheme.enum';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public categories$: Observable<CategoryInterface[]> = this.categoryService.get();
    public income = TransactionTypeEnum.INCOME;
    public expense = TransactionTypeEnum.EXPENSE;
    constructor(
        private dialogService: DialogService,
        private categoryService: CategoryService,
        private snackbarService: SnackbarService
    ) {}

    public createCategory(type: TransactionTypeEnum) {
        const options: DialogDataInterface = {
            title: 'Add Category',
            content: AddCategoryComponent,
            width: '400px',
            disableClose: true,
        };

        const dialog = this.dialogService.open(options);

        this.dialogService
            .confirmed(dialog)
            .pipe(
                takeUntil(this.destroy$),
                filter((res) => !!res)
            )
            .subscribe((category) => {
                if (!category.colorScheme) {
                    category.colorScheme = this.setDefaultColor(type);
                }
                const newCategory = { ...category, transactionType: type };
                this.categoryService.create(newCategory);
            });
    }

    public deleteCategory(id: string, event: Event): void {
        event.stopPropagation();
        const options = {
            title: deleteCategoryMessage,
            cancelText: 'NO',
            confirmText: 'YES',
            width: '700px',
        };

        const dialog = this.dialogService.open(options);

        this.dialogService
            .confirmed(dialog)
            .pipe(
                takeUntil(this.destroy$),
                filter((res) => !!res)
            )
            .subscribe(() => {
                this.categoryService.delete(id);
                this.snackbarService.openSuccess(deleteCategorySuccessMessage);
            });
    }

    public editCategory(category: CategoryInterface, event: Event): void {
        event.stopPropagation();
        const options: DialogDataInterface = {
            title: 'Edit Category',
            content: AddCategoryComponent,
            width: '400px',
            disableClose: true,
            data: category,
        };

        const dialog = this.dialogService.open(options);

        this.dialogService
            .confirmed(dialog)
            .pipe(
                takeUntil(this.destroy$),
                filter((res) => !!res)
            )
            .subscribe((res) => {
                const editedCategory = { ...category, ...res };
                this.categoryService.edit(editedCategory);
                this.snackbarService.openSuccess(EditCategorySuccessMessage);
            });
    }

    private setDefaultColor(type: string): string {
        return type === this.income ? ColorSchemeEnum.GREEN : ColorSchemeEnum.RED;
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
