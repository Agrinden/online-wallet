import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessTokenService } from '@app/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private accessTokenService: AccessTokenService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.accessTokenService.get();

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
