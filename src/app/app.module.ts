import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomHttpInterceptor, DEFAULT_TIMEOUT } from './core/interceptor/interceptor';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    { provide: DEFAULT_TIMEOUT, useValue: 300000 }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
