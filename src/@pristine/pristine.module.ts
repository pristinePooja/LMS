import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { PristineConfirmationModule } from '@pristine/services/confirmation';
import { PristineLoadingModule } from '@pristine/services/loading';
import { PristineMediaWatcherModule } from '@pristine/services/media-watcher/media-watcher.module';
import { PristineSplashScreenModule } from '@pristine/services/splash-screen/splash-screen.module';
import { PristineUtilsModule } from '@pristine/services/utils/utils.module';
import {ValidateResponse} from "./process/ValidateResponse";
import {MaxRangeSelectionStrategy} from "./process/DateRange.services";
import {EncriptDecript} from "./process/EncriptDecript";
import {WebApiHttp} from "./process/WebApiHttp.services";
import {ExcelService} from "./process/excel.Service";
import {SignalR} from "./process/SignalR";
import {DatePipe} from "@angular/common";
import {AuthGuard} from "./process/AuthGuard";
import {SessionManagement} from "./process/SessionManagement";

@NgModule({
    imports  : [
        PristineConfirmationModule,
        PristineLoadingModule,
        PristineMediaWatcherModule,
        PristineSplashScreenModule,
        PristineUtilsModule
    ],
    providers: [
        EncriptDecript,
        DatePipe,
        ValidateResponse,
        MaxRangeSelectionStrategy,
        WebApiHttp,
        ExcelService,
        AuthGuard,
        SignalR,
        SessionManagement,
        {
            // Disable 'theme' sanity check
            provide : MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme  : false,
                version: true
            }
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill'
            }
        }
    ]
})
export class PristineModule
{
    /**
     * Constructor
     */
    constructor(@Optional() @SkipSelf() parentModule?: PristineModule)
    {
        if ( parentModule )
        {
            throw new Error('PristineModule has already been loaded. Import this module in the AppModule only!');
        }
    }
}
