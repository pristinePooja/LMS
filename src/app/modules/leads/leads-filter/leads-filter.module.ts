import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsFilterComponent } from '../leads-filter/leads-filter.component';



@NgModule({
    declarations: [
        LeadsFilterComponent
    ],
    exports: [
        LeadsFilterComponent
    ],
    imports: [
        CommonModule
    ]
})
export class LeadsFilterModule { }
