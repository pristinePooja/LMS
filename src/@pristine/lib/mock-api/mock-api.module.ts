import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PRISTINE_MOCK_API_DEFAULT_DELAY } from '@pristine/lib/mock-api/mock-api.constants';
import { PristineMockApiInterceptor } from '@pristine/lib/mock-api/mock-api.interceptor';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: PristineMockApiInterceptor,
            multi   : true
        }
    ]
})
export class PristineMockApiModule
{
    /**
     * PristineMockApi module default configuration.
     *
     * @param mockApiServices - Array of services that register mock API handlers
     * @param config - Configuration options
     * @param config.delay - Default delay value in milliseconds to apply all responses
     */
    static forRoot(mockApiServices: any[], config?: { delay?: number }): ModuleWithProviders<PristineMockApiModule>
    {
        // console.log('in mockAPI', mockApiServices)
        return {
            ngModule : PristineMockApiModule,
            providers: [
                {
                    provide   : APP_INITIALIZER,
                    deps      : [...mockApiServices],
                    useFactory: () => (): any => null,
                    multi     : true
                },
                {
                    provide : PRISTINE_MOCK_API_DEFAULT_DELAY,
                    useValue: config?.delay ?? 0
                }
            ]
        };
    }
}
