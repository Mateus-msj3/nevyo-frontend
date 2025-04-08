import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {importProvidersFrom} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {CoreModule} from "./app/core/core.module";
import {LoaderService} from "./app/core/services/loader.service";
import {LoaderInterceptor} from "./app/core/interceptors/loader.interceptor";
import {httpInterceptorProviders} from "./app/core/interceptors/http-request.interceptor";
import {ErrorInterceptor} from "./app/core/interceptors/error.interceptor";
import {ConvertDateInterceptor} from "./app/core/interceptors/convert-date.interceptor";
import {MessageService} from "primeng/api";

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    importProvidersFrom(BrowserAnimationsModule, CoreModule),
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
    LoaderService,
    LoaderInterceptor,
    httpInterceptorProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ConvertDateInterceptor,
      multi: true
    }
  ],
}).catch((err) => console.error(err));
