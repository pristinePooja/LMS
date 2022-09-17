import { SocialLoginModule,SocialAuthServiceConfig, GoogleLoginProvider  } from '@abacritt/angularx-social-login';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { PristineModule } from '@pristine';
import { MarkdownModule } from 'ngx-markdown';
import { PristineConfigModule } from '@pristine/services/config';
import { AppComponent } from 'app/app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { appRoutes } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { appConfig } from './core/config/app.config';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule,HTTP_INTERCEPTORS   } from '@angular/common/http'
import {
  GoogleApiModule, 
  GoogleApiService, 
  GoogleAuthService, 
  NgGapiClientConfig, 
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";
import { AuthenticationService } from './shared/AuthenticationService.service';

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    useHash: true,
    scrollPositionRestoration: 'enabled'
};

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "830495043822-0iu6clc0p1cbsgrm0557feo0fnlnnh01.apps.googleusercontent.com",
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  scope: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events"

  ].join(" ")
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [

        BrowserModule,
        BrowserAnimationsModule,
        MatMomentDateModule,
        ComponentsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Pristine, PristineConfig & PristineMockAPI
        PristineModule,
        PristineConfigModule.forRoot(appConfig),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        GoogleApiModule.forRoot({
          provide: NG_GAPI_CONFIG,
          useValue: gapiClientConfig
        }),
        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            countDuplicates: true,
            resetTimeoutOnDuplicate: true,
            progressBar: true,
            progressAnimation: 'decreasing',
            closeButton: true,
          }),
           // ToastrModule added
        NgxSpinnerModule,

        SocialLoginModule,
        HttpClientModule
    ],
    bootstrap   : [
        AppComponent
    ],
    schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    providers:[AuthenticationService]

})
export class AppModule
{
}

