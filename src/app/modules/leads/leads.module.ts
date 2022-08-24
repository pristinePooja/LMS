import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsComponent } from './leads.component';
import { MatSidenavModule} from "@angular/material/sidenav";
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {HeaderModule} from "../../../@pristine/components/header/header.module";
import {PristineDrawerModule} from "../../../@pristine/components/drawer";
import {LeadsFilterComponent} from "./leads-filter/leads-filter.component";
import {LeadsListComponent} from "./leads-list/leads-list.component";
import { CreateEditLeadsComponent } from './create-edit-leads/create-edit-leads.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { NgForm } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LeadsService } from './leads.service';
import { HeaderComponent } from '@pristine/components/header/header.component';

const route: Routes =[{
  path:'lead_list',
  component: LeadsComponent,
  resolve:{
    key: LeadsService
  }
 
}]
@NgModule({
  declarations: [
    LeadsComponent,
      LeadsFilterComponent,
      LeadsListComponent,
      CreateEditLeadsComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        MatButtonModule,
        HeaderModule,
        MatSidenavModule,
        PristineDrawerModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        MatCheckboxModule,
        RouterModule.forChild(route)
    ], providers:[LeadsService]
})
export class LeadsModule { }
