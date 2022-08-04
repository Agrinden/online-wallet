import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { CoreModule } from '@app/core/core.module';

@Injectable({
    providedIn: CoreModule,
})
export class SnackbarService {
    constructor(public snackBar: MatSnackBar) {}

    config: MatSnackBarConfig = {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
    };

    success(message: string) {
        this.config['panelClass'] = ['notification', 'success'];
        this.snackBar.open(message, 'OK', this.config);
    }
}
