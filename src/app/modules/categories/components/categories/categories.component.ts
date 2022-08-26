import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { Component, OnDestroy } from '@angular/core';
import { CategoryInterface, CategoryTemplateInterface } from '@app/shared';
import { Observable, Subject, takeUntil, filter } from 'rxjs';
import { DialogDataInterface } from '@app/shared/interfaces/dialog-data.interface';
import { AddCategoryComponent } from '@app/shared/add-category/components/add-category.component';
import {
    categoryDeletionFailedMessage,
    CategoryWrapperService,
    deleteCategoryMessage,
    deleteCategorySuccessMessage,
    deleteSubcategoryMessage,
    deleteSubcategorySuccessMessage,
    EditCategorySuccessMessage,
    EditSubcategorySuccessMessage,
    SnackbarService,
} from '@app/core';
import { TransactionTypeEnum } from '@app/shared/enums/transaction-type.enum';
import { ColorSchemeEnum } from '@app/shared/enums/color-scheme.enum';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnDestroy {
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public incomeCategories$: Observable<CategoryInterface[]> = this.categoryWrapperService.getIncomes();
    public expenseCategories$: Observable<CategoryInterface[]> = this.categoryWrapperService.getExpenses();

    public type = TransactionTypeEnum;

    constructor(
        private dialogService: DialogService,
        private snackbarService: SnackbarService,
        private categoryWrapperService: CategoryWrapperService
    ) {}

    public createCategory(type: TransactionTypeEnum, parentId?: string, parentColor?: string): void {
        const options: DialogDataInterface = {
            title: parentId ? 'Add Expense Subcategory' : 'Add Category',
            content: AddCategoryComponent,
            width: '400px',
            disableClose: true,
            data: {
                defaultColor: parentId ? parentColor : this.setDefaultColor(type),
            },
        };

        const dialog = this.dialogService.open(options);

        this.dialogService
            .confirmed(dialog)
            .pipe(
                takeUntil(this.destroy$),
                filter((res) => !!res)
            )
            .subscribe((category: CategoryTemplateInterface) => {
                this.categoryWrapperService
                    .create(category, type, parentId)
                    .pipe(
                        takeUntil(this.destroy$),
                        filter((res) => !!res)
                    )
                    .subscribe(() => {
                        this.incomeCategories$ = this.categoryWrapperService.getIncomes();
                        this.expenseCategories$ = this.categoryWrapperService.getExpenses();
                    });
            });
    }

    public deleteCategory(id: string, event: Event, parentId?: string): void {
        event.stopPropagation();
        const options = {
            title: parentId ? deleteSubcategoryMessage : deleteCategoryMessage,
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
                this.categoryWrapperService
                    .delete(id, parentId)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res: any) => {
                        if (res && res.status === 409) {
                            this.snackbarService.openSuccess(categoryDeletionFailedMessage);
                        } else {
                            this.incomeCategories$ = this.categoryWrapperService.getIncomes();
                            this.expenseCategories$ = this.categoryWrapperService.getExpenses();
                            this.snackbarService.openSuccess(
                                parentId ? deleteSubcategorySuccessMessage : deleteCategorySuccessMessage
                            );
                        }
                    });
            });
    }

    public editCategory(category: CategoryInterface, event: Event, parentId?: string): void {
        event.stopPropagation();
        const options: DialogDataInterface = {
            title: parentId ? 'Edit Expense Subcategory' : 'Edit Category',
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
                this.categoryWrapperService
                    .edit(editedCategory, parentId)
                    .pipe(
                        takeUntil(this.destroy$),
                        filter((res) => !!res)
                    )
                    .subscribe(() => {
                        this.incomeCategories$ = this.categoryWrapperService.getIncomes();
                        this.expenseCategories$ = this.categoryWrapperService.getExpenses();
                        this.snackbarService.openSuccess(
                            parentId ? EditSubcategorySuccessMessage : EditCategorySuccessMessage
                        );
                    });
            });
    }

    private setDefaultColor(type: string): string {
        return type === TransactionTypeEnum.INCOME ? ColorSchemeEnum.GREEN : ColorSchemeEnum.RED;
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
