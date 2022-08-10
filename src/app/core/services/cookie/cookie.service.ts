import { Injectable } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { month, weekDays } from './date-constants';

@Injectable({
    providedIn: CoreModule,
})
export class CookieService {
    get(): string {
        const cookie = document.cookie;
        let token = '';
        if (cookie !== '') {
            token = cookie.split('=')[1];
        }
        return token;
    }

    set(token: string): void {
        const currDate = new Date();
        document.cookie = `token=${token}; expires=${weekDays[currDate.getUTCDay()]}, ${currDate.getUTCDate() + 1} ${
            month[currDate.getUTCMonth()]
        } ${currDate.getUTCFullYear()} ${currDate.getUTCHours()}:${currDate.getUTCMinutes()}:${currDate.getUTCSeconds()} UTC; SameSite=Strict; Secure; path=/`;
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
