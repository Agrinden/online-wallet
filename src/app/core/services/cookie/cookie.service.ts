import { Injectable } from '@angular/core';
import { UserInterface } from '@app/shared';
import { CoreModule } from '@core/core.module';
import jwtDecode from 'jwt-decode';
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
        const user: UserInterface = jwtDecode(token);
        const expDate = new Date(user.exp * 1000);

        document.cookie = `token=${token}; expires=${weekDays[expDate.getUTCDay()]}, ${expDate.getUTCDate()} ${
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
