import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HttpTransactionService {
    constructor(private http: HttpClient) {}

    public postTransaction({ itemType }: any): Observable<any> {
        return of();
    }
}
