import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PristineAlertComponent } from '@pristine/components/alert/alert.component';

@NgModule({
    declarations: [
        PristineAlertComponent
    ],
    imports     : [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        PristineAlertComponent
    ]
})
export class PristineAlertModule
{
}
