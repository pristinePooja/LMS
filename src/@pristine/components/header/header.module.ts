import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatMenu, MatMenuModule} from "@angular/material/menu";
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
    declarations: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatMenuModule,
        MatDialogModule
    ]
})
export class HeaderModule { }
