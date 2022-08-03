import { ModuleWithProviders, NgModule } from '@angular/core';
import { PristineConfigService } from '@pristine/services/config/config.service';
import { PRISTINE_APP_CONFIG } from '@pristine/services/config/config.constants';

@NgModule()
export class PristineConfigModule
{
    /**
     * Constructor
     */
    constructor(private _pristineConfigService: PristineConfigService)
    {
    }

    /**
     * forRoot method for setting user configuration
     *
     * @param config
     */
    static forRoot(config: any): ModuleWithProviders<PristineConfigModule>
    {
        return {
            ngModule : PristineConfigModule,
            providers: [
                {
                    provide : PRISTINE_APP_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
