import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PristineCardComponent } from '@pristine/components/card/card.component';

@NgModule({
    declarations: [
        PristineCardComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        PristineCardComponent
    ]
})
export class PristineCardModule
{
}
