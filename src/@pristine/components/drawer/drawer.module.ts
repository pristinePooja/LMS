import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PristineDrawerComponent } from '@pristine/components/drawer/drawer.component';

@NgModule({
    declarations: [
        PristineDrawerComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        PristineDrawerComponent
    ]
})
export class PristineDrawerModule
{
}
