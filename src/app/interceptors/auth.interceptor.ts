import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from '@app/core/services/cookie/cookie.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private cookieService: CookieService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.cookieService.get();

        if (token) {
            const clonedReq = request.clone({
                headers: request.headers.set('Authorization', token),
            });
            return next.handle(clonedReq);
        } else {
            return next.handle(request);
        }
    }
}
