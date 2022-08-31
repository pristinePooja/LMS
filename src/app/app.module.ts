import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { PristineModule } from '@pristine';
import { PristineConfigModule } from '@pristine/services/config';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    useHash: true,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Pristine, PristineConfig & PristineMockAPI
        PristineModule,
        PristineConfigModule.forRoot(appConfig),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

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
    ],
    bootstrap   : [
        AppComponent
    ],
    schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule
{
}
