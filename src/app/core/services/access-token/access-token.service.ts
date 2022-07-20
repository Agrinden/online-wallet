import { Injectable } from '@angular/core';

@Injectable()
export class AccessTokenService {
    get(): string | null {
        return sessionStorage.getItem('token');
    }

    getRefreshToken(): string | null {
        return sessionStorage.getItem('refreshToken');
    }

    set(token: string, refreshToken: string): void {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('refreshToken', refreshToken);
    }

    clear(): void {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
    }
}
