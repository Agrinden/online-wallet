import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy, Optional, Inject } from '@angular/core';
import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { cancelCategoryCreation } from '@app/core';
import { Subject, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit, OnDestroy {
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public categoryForm!: FormGroup;

    private isEdit: boolean = this.dialogData.data;

    constructor(
        private formBuilder: FormBuilder,
        private dialogService: DialogService,
        @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any
    ) {}

    ngOnInit(): void {
        this.categoryForm = this.getCategoryForm();
    }

    private getCategoryForm(): FormGroup {
        const form = this.formBuilder.group({
            name: new FormControl(this.isEdit ? this.dialogData.data.name : '', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100),
                Validators.pattern(/^[a-zA-Z0-9!@#\$%\^\&*\)\(/+=._ -]{0,100}$/),
            ]),
            color: new FormControl(this.isEdit ? this.dialogData.data.color : ''),
        });
        return form;
    }
    public get name() {
        return this.categoryForm.get('name');
    }

    public getErrorMessage() {
        if (this.name?.hasError('required')) {
            return 'Please fill in the name of category';
        }
        if (this.name?.hasError('pattern')) {
            return 'Only latin letters in lowercase and uppercase, numbers, special characters and spaces are allowed';
        }
        if (this.name?.hasError('minlength')) {
            return 'Name must contain at least 3 characters';
        }

        return this.name?.hasError('maxlength') ? 'Name must contain at most 100 characters' : '';
    }

    public onCancel(): void {
        if (this.categoryForm.pristine) {
            this.dialogService.close();
        } else {
            this.cancelCategoryCreation();
        }
    }

    private cancelCategoryCreation() {
        const options = {
            title: cancelCategoryCreation,
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
                    this.categoryForm.reset();
                    this.dialogService.close();
                }
            });
    }

    public confirmButtonText(): string {
        return this.isEdit ? 'Edit' : 'Create';
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
