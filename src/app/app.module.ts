import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app-core/core.module';
import { SharedModule } from '@app-shared/shared.module';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatisticsBarComponent } from './core/statistics-bar/statistics-bar.component';

@NgModule({
    declarations: [AppComponent, StatisticsBarComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule, ReactiveFormsModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
