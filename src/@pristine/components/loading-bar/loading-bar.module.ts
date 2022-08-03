import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PristineLoadingBarComponent } from '@pristine/components/loading-bar/loading-bar.component';

@NgModule({
    declarations: [
        PristineLoadingBarComponent
    ],
    imports     : [
        CommonModule,
        MatProgressBarModule
    ],
    exports     : [
        PristineLoadingBarComponent
    ]
})
export class PristineLoadingBarModule
{
}
