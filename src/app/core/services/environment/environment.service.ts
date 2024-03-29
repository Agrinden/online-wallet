import { CoreModule } from '@core/core.module';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentInterface } from '@app/shared';

@Injectable({
    providedIn: CoreModule,
})
export class EnvironmentService {
    constructor(private http: HttpClient) {}

    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(() => new Error(errorMessage));
    }
    //Blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
    sendGetRequest(): Observable<EnvironmentInterface<string>> {
        const options = { params: new HttpParams({ fromString: '&searchParam=backend' }) };
        return this.http
            .get<EnvironmentInterface<string>>(`${environment.apiUrl}`, options)
            .pipe(catchError(this.handleError));
    }
}
