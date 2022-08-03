import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PristineHighlightComponent } from '@pristine/components/highlight/highlight.component';

@NgModule({
    declarations: [
        PristineHighlightComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        PristineHighlightComponent
    ]
})
export class PristineHighlightModule
{
}
