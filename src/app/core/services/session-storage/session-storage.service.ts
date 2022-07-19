import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SessionStorageService {
    getAccessToken(): string | null {
        return sessionStorage.getItem('token');
    }

    getRefreshToken(): string | null {
        return sessionStorage.getItem('refreshToken');
    }

    setSessionToken(token: string, refreshToken: string): void {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('refreshToken', refreshToken);
    }

    clearAccessToken(): void {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
    }

    public get isLoggedIn$(): Observable<boolean> {
        // return of(!!this.getAccessToken()) || of(!!this.getRefreshToken());   //  uncomment later
        return of(true); //  temporary, for delete later
    }
}
