import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { CoreModule, HomeLayoutComponent, LoginLayoutComponent } from '@core';
import { SharedModule } from '@shared/shared.module';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { secrets } from '@secrets/secrets';

@NgModule({
    declarations: [AppComponent, LoginLayoutComponent, HomeLayoutComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
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
