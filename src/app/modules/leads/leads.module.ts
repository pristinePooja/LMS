import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsComponent } from './leads.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { SharedModule } from "../../shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { HeaderModule } from "../../../@pristine/components/header/header.module";
import { PristineDrawerModule } from "../../../@pristine/components/drawer";
import { LeadsFilterComponent } from "./leads-filter/leads-filter.component";
import { LeadsListComponent } from "./leads-list/leads-list.component";
import { CreateEditLeadsComponent } from './create-edit-leads/create-edit-leads.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { NgForm } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LeadsService } from './leads.service';
import { AttachmentsComponent } from "./leads_components/attachments/attachments.component";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScheduleCallComponent } from './leads_components/schedule-call/schedule-call.component';
import { CallLogComponent } from './leads_components/call-log/call-log.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CallInformationComponent } from './leads_components/call-information/call-information.component';
import { MeetingComponent } from './leads_components/meeting/meeting.component';

const route: Routes = [{
  path: 'lead_list',
  component: LeadsComponent,
  resolve: {
    key: LeadsService
  }

}]
@NgModule({
  declarations: [
    LeadsComponent,
    LeadsFilterComponent,
    LeadsListComponent,
    CreateEditLeadsComponent,
    AttachmentsComponent,
    ScheduleCallComponent,
    CallLogComponent,
    CallInformationComponent,
    MeetingComponent
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
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    RouterModule.forChild(route)
  ], 
  providers: [LeadsService]
  
})
export class LeadsModule { }
