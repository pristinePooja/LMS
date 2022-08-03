import { NgModule } from '@angular/core';
import { PristineScrollResetDirective } from '@pristine/directives/scroll-reset/scroll-reset.directive';

@NgModule({
    declarations: [
        PristineScrollResetDirective
    ],
    exports     : [
        PristineScrollResetDirective
    ]
})
export class PristineScrollResetModule
{
}
