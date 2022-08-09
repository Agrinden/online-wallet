import { CategoryService } from '@core';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryNameExistsValidator implements AsyncValidator {
    constructor(private categoryService: CategoryService) {}

    validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.categoryService.isNameUnique(ctrl.value).pipe(
            map((isTaken) => (isTaken ? { uniqueName: true } : null)),
            catchError(() => of(null))
        );
    }
}
