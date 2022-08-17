import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsComponent } from './leads.component';
import { MatSidenavModule} from "@angular/material/sidenav";
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {HeaderModule} from "../../../@pristine/components/header/header.module";
import {PristineDrawerModule} from "../../../@pristine/components/drawer";
import {LeadsFilterComponent} from "./leads-filter/leads-filter.component";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {LeadsListComponent} from "./leads-list/leads-list.component";
import { CreateEditLeadsComponent } from './create-edit-leads/create-edit-leads.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    LeadsComponent,
      LeadsFilterComponent,
      LeadsListComponent,
      CreateEditLeadsComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        MatButtonModule,
        HeaderModule,
        MatSidenavModule,
        PristineDrawerModule,
        MatIconModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class LeadsModule { }
