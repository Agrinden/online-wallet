import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
    public categoryForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.categoryForm = this.getCategoryForm();
    }

    private getCategoryForm(): FormGroup {
        const form = this.formBuilder.group({
            category: ['', Validators.required],
        });
        return form;
    }
}
