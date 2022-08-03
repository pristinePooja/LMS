import { NgModule } from '@angular/core';
import { PristineScrollbarDirective } from '@pristine/directives/scrollbar/scrollbar.directive';

@NgModule({
    declarations: [
        PristineScrollbarDirective
    ],
    exports     : [
        PristineScrollbarDirective
    ]
})
export class PristineScrollbarModule
{
}
