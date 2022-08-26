import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { CategoryWrapperService } from '@app/core';
import { catchError, map, Observable, of } from 'rxjs';

export class CategoryNameValidator {
    static createValidator(categoryWrapperService: CategoryWrapperService, editedName?: string): AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            if (editedName && editedName === control.value) {
                return of(null);
            }
            return categoryWrapperService.isNameUnique(control.value).pipe(
                map((isNotUnique) => (isNotUnique ? { notUniqueName: true } : null)),
                catchError(() => of(null))
            );
        };
    }
}
