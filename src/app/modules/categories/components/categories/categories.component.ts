import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { Component } from '@angular/core';
import { CATEGORIES } from '@app/mocks';
import { CategoryInterface } from '@app/shared';
import { Subject, takeUntil } from 'rxjs';
import { DialogDataInterface } from '@app/shared/interfaces/dialog-data.interface';
import { AddCategoryComponent } from '@app/shared/add-category/components/add-category.component';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
    categories: CategoryInterface[] = CATEGORIES;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(private dialogService: DialogService) {}

    ngOnInit(): void {}

    createCategory() {
        const options: DialogDataInterface = {
            title: 'Add Category',
            content: AddCategoryComponent,
            width: '500px',
            disableClose: true,
        };

        this.dialogService.open(options);

        this.dialogService
            .confirmed()
            .pipe(takeUntil(this.destroy$))
            .subscribe((category) => {
                if (category) {
                    console.log(category);
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    deleteCategory(id: string) {
        this.categories = this.categories.filter((category) => category.id !== id);
    }
}
