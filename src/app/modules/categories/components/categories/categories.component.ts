import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { Component } from '@angular/core';
import { CategoryInterface } from '@app/shared';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DialogDataInterface } from '@app/shared/interfaces/dialog-data.interface';
import { AddCategoryComponent } from '@app/shared/add-category/components/add-category.component';
import {
    CategoryService,
    deleteCategoryMessage,
    deleteCategorySuccessMessage,
    EditCategorySuccessMessage,
    SnackbarService,
} from '@app/core';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
    public categories$: Observable<CategoryInterface[]> = this.categoryService.getCategories();
    private destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        private dialogService: DialogService,
        private categoryService: CategoryService,
        private snackbarService: SnackbarService
    ) {}

    ngOnInit(): void {}

    public createCategory(type: string) {
        const options: DialogDataInterface = {
            title: 'Add Category',
            content: AddCategoryComponent,
            width: '400px',
            disableClose: true,
        };

        this.dialogService.open(options);

        this.dialogService
            .confirmed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((category) => {
                if (category) {
                    if (!category.color) {
                        category.color = this.setDefaultColor(type);
                    }
                    const newCategory = { ...category, transactionType: type };
                    this.categoryService.createCategory(newCategory);
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    public deleteCategory(id: string) {
        const options = {
            title: deleteCategoryMessage,
            cancelText: 'NO',
            confirmText: 'YES',
            width: '700px',
        };

        this.dialogService.open(options);

        this.dialogService
            .confirmed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result) => {
                if (result) {
                    this.categoryService.deleteCategory(id);
                    this.snackbarService.success(deleteCategorySuccessMessage);
                }
            });
    }

    public editCategory(category: CategoryInterface) {
        const options: DialogDataInterface = {
            title: 'Edit Category',
            content: AddCategoryComponent,
            width: '400px',
            disableClose: true,
            data: category,
        };

        this.dialogService.open(options);

        this.dialogService
            .confirmed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                if (res) {
                    const editedCategory = { ...category, ...res };
                    this.categoryService.editCategory(editedCategory);
                    this.snackbarService.success(EditCategorySuccessMessage);
                }
            });
    }

    private setDefaultColor(type: string) {
        return type === 'income' ? '#38ff00' : '#ff3100';
    }
}
