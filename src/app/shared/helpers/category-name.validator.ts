import { CategoryService } from '@core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

export class CategoryNameValidator {
    static createValidator(categoryService: CategoryService, editedName?: string): AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            if (editedName && editedName === control.value) {
                return of(null);
            }
            return categoryService.isNameUnique(control.value).pipe(
                map((isNotUnique) => (isNotUnique ? { notUniqueName: true } : null)),
                catchError(() => of(null))
            );
        };
    }
}
