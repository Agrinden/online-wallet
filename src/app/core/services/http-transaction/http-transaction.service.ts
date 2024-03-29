import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { CreateTransactionInterface, UpdateTransactionInterface } from '@app/shared';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: CoreModule,
})
export class HttpTransactionService {
    constructor(private http: HttpClient) {}

    public getTransaction(body: CreateTransactionInterface): Observable<any> {
        return of(body);
    }

    public postTransaction(body: CreateTransactionInterface): Observable<any> {
        return of(body);
    }

    public updateTransaction(body: UpdateTransactionInterface): Observable<any> {
        return of(body);
    }
}
