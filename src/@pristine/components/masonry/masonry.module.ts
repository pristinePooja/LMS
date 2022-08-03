import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PristineMasonryComponent } from '@pristine/components/masonry/masonry.component';

@NgModule({
    declarations: [
        PristineMasonryComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        PristineMasonryComponent
    ]
})
export class PristineMasonryModule
{
}
