import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit, OnDestroy, Optional, Inject, AfterViewInit } from '@angular/core';
import { DialogService } from '@app/shared/dialog/services/dialog.service';
import { cancelCategoryCreation, cancelCategoryEditing, CategoryWrapperService } from '@core';
import { Subject, takeUntil, filter } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryNameValidator } from '@app/shared/helpers/category-name.validator';

@Component({
    selector: 'add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit, OnDestroy, AfterViewInit {
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public categoryForm!: FormGroup;
    private isEdit: boolean = this.dialogData?.data?.name;
    public buttonText: string = this.confirmButtonText();
    public nameErrorMessage!: string;

    constructor(
        private formBuilder: FormBuilder,
        private dialogService: DialogService,
        @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
        private categoryWrapperService: CategoryWrapperService
    ) {}

    ngOnInit(): void {
        this.categoryForm = this.getCategoryForm();
    }

    private getCategoryForm(): FormGroup {
        const form = this.formBuilder.group({
            name: new FormControl(this.isEdit ? this.dialogData.data.name : '', {
                validators: [
                    Validators.required,
                    Validators.pattern(/^[a-zA-Z0-9!@#\$%\^\&*\)\(/+=._ -]{0,150}$/),
                    Validators.minLength(3),
                    Validators.maxLength(100),
                ],
                asyncValidators: [
                    CategoryNameValidator.createValidator(this.categoryWrapperService, this.dialogData?.data?.name),
                ],
                updateOn: 'blur',
            }),
            colorScheme: new FormControl(
                this.isEdit ? this.dialogData.data.colorScheme : this.dialogData?.data?.defaultColor
            ),
        });
        return form;
    }

    public get name(): AbstractControl | null {
        return this.categoryForm.get('name');
    }

    ngAfterViewInit(): void {
        this.name?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.nameErrorMessage = this.getErrorMessage();
        });
    }

    private getErrorMessage(): string {
        if (this.name?.hasError('required')) {
            return 'Please fill in the name of category';
        }
        if (this.name?.hasError('notUniqueName')) {
            return 'This name already exists';
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
            this.dialogService.closeAll();
        } else {
            this.cancelCategoryCreation();
        }
    }

    private cancelCategoryCreation(): void {
        const options = {
            title: this.isEdit ? cancelCategoryEditing : cancelCategoryCreation,
            cancelText: 'NO',
            confirmText: 'YES',
            width: '700px',
        };

        const dialog = this.dialogService.open(options);

        this.dialogService
            .confirmed(dialog)
            .pipe(
                takeUntil(this.destroy$),
                filter((result) => !!result)
            )
            .subscribe(() => {
                this.categoryForm.reset();
                this.dialogService.closeAll();
            });
    }

    private confirmButtonText(): string {
        return this.isEdit ? 'Update' : 'Create';
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
