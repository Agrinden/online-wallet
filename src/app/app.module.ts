import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { environment } from '@env/environment';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
    declarations: [AppComponent, LoginLayoutComponent, HomeLayoutComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,

        AuthModule.forRoot({
            config: {
                authority: 'https://accounts.google.com',
                redirectUrl: window.location.origin,
                clientId: environment.googleClientId,
                scope: 'openid profile email',
                responseType: 'id_token token',
                silentRenew: true,
                useRefreshToken: true,
                logLevel: LogLevel.Error,
            },
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
