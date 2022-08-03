import { NgModule } from '@angular/core';
import { PristineUtilsService } from '@pristine/services/utils/utils.service';

@NgModule({
    providers: [
        PristineUtilsService
    ]
})
export class PristineUtilsModule
{
    /**
     * Constructor
     */
    constructor(private _pristineUtilsService: PristineUtilsService)
    {
    }
}
