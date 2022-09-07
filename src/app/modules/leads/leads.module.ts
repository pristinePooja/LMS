import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { NgxSpinnerModule } from 'ngx-spinner';
import { LeadViewComponent } from './lead-view/lead-view.component';
import { MatMenuModule } from '@angular/material/menu';
import { FileUploaderComponent } from './componets/file-uploader/file-uploader.component';
import { DragDirective } from '@pristine/directives/dragDrop.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

const route: Routes =[{
  path:'lead_list',
  component: LeadsComponent,
  resolve:{
    key: LeadsService
  }
},
  // {
  //   path:'lead_list/view_lead',
  //   component: LeadsComponent,
  //   data: {state:'view'},
  //   resolve:{
  //     key: LeadsService
  //   }
  // }
]
@NgModule({
  declarations: [
    LeadsComponent,
      LeadsFilterComponent,
      LeadsListComponent,
      CreateEditLeadsComponent,
      LeadViewComponent,
      FileUploaderComponent,
      DragDirective
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
        NgxSpinnerModule,
        MatMenuModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule,
        MatAutocompleteModule,
        RouterModule.forChild(route)
    ], providers:[LeadsService, DatePipe]
})
export class LeadsModule { }
