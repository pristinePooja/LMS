import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PristineLoadingInterceptor } from '@pristine/services/loading/loading.interceptor';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: PristineLoadingInterceptor,
            multi   : true
        }
    ]
})
export class PristineLoadingModule
{
}
