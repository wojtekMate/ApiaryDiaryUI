import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthCanLoadGuard } from './services/auth/auth-can-load.guard';
import { AuthResponseInterceptor } from './services/auth/auth.interceptor';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard, AuthCanLoadGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthResponseInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
