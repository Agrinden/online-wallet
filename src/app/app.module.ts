import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { secrets } from '@secrets/secrets';

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
        HttpClientModule,

        AuthModule.forRoot({
            config: {
                authority: 'https://accounts.google.com',
                redirectUrl: window.location.origin,
                clientId: secrets.googleClientId,
                scope: 'openid profile email',
                responseType: 'id_token token',
                silentRenew: true,
                useRefreshToken: true,
                logLevel: LogLevel.Error,
            },
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
