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
                map((isUnique) => (isUnique ? null : { uniqueName: true })),
                catchError(() => of(null))
            );
        };
    }
}
