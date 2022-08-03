import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsComponent } from '../leads/leads.component';
import {LeadsFilterModule} from "./leads-filter/leads-filter.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {PristineDrawerModule} from "../../../@pristine/components/drawer";
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {HeaderModule} from "../../../@pristine/components/header/header.module";



@NgModule({
  declarations: [
    LeadsComponent
  ],
    imports: [
        CommonModule,
        LeadsFilterModule,
        SharedModule,
        MatButtonModule,
        PristineDrawerModule,
        HeaderModule
    ]
})
export class LeadsModule { }
