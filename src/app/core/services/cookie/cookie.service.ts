import { Injectable } from '@angular/core';
import { UserInterface } from '@app/shared';
import { CoreModule } from '@core/core.module';
import jwtDecode from 'jwt-decode';
import { month, weekDays } from './date-constants';

@Injectable({
    providedIn: CoreModule,
})
export class CookieService {
    get(cookieName: string): string {
        const cookie = document.cookie;
        let askedCookie = '';
        if (cookie !== '') {
            const cookiesArr = cookie.split('=');
            for (let i = 0; i < cookiesArr.length; i++) {
                if (cookiesArr[i] === cookieName) askedCookie = cookiesArr[i + 1];
            }
        }
        return askedCookie;
    }

    set(cookieName: string, cookie: string, expirationDate: number): void {
        const expDate = new Date(expirationDate * 1000);

        document.cookie = `${cookieName}=${cookie}; expires=${weekDays[expDate.getUTCDay()]}, ${expDate.getUTCDate()} ${
            month[expDate.getUTCMonth()]
        } ${expDate.getUTCFullYear()} ${expDate.getUTCHours()}:${expDate.getUTCMinutes()}:${expDate.getUTCSeconds()} UTC; SameSite=Strict; Secure; path=/`;
    }

    clear(cookieKey: string = ''): void {
        if (cookieKey) {
            document.cookie = `${cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict; Secure; path=/;`;
        } else {
            const cookies = document.cookie.split('; ');
            cookies.forEach((el) => {
                const key = el.split('=');
                document.cookie = `${key[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict; Secure; path=/;`;
            });
        }
    }
}
