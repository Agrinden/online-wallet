import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { Component } from '@angular/core';
import { CategoryInterface } from '@app/shared';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DialogDataInterface } from '@app/shared/interfaces/dialog-data.interface';
import { AddCategoryComponent } from '@app/shared/add-category/components/add-category.component';
import { CategoryService } from '@app/core';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
    categories$: Observable<CategoryInterface[]> = this.categoryService.getCategories();
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(private dialogService: DialogService, private categoryService: CategoryService) {}

    ngOnInit(): void {}

    createCategory(type: string) {
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

    deleteCategory(id: string) {
        console.log('deleted', id);
    }

    editCategory(id: string) {
        const options: DialogDataInterface = {
            title: 'Edit Category',
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
                    console.log(category);

                    this.categoryService.editCategory(id, category);
                }
            });
    }

    private setDefaultColor(type: string) {
        return type === 'income' ? 'green' : 'red';
    }
}
