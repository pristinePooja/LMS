import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PristineConfirmationService } from '@pristine/services/confirmation/confirmation.service';
import { PristineConfirmationDialogComponent } from '@pristine/services/confirmation/dialog/dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        PristineConfirmationDialogComponent
    ],
    imports     : [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        CommonModule
    ],
    providers   : [
        PristineConfirmationService
    ]
})
export class PristineConfirmationModule
{
    /**
     * Constructor
     */
    constructor(private _pristineConfirmationService: PristineConfirmationService)
    {
    }
}
