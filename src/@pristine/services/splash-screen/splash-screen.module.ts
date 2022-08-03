import { NgModule } from '@angular/core';
import { PristineSplashScreenService } from '@pristine/services/splash-screen/splash-screen.service';

@NgModule({
    providers: [
        PristineSplashScreenService
    ]
})
export class PristineSplashScreenModule
{
    /**
     * Constructor
     */
    constructor(private _pristineSplashScreenService: PristineSplashScreenService)
    {
    }
}
