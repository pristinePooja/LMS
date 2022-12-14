import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DragDirective } from '@pristine/directives/dragDrop.directive';
import { ScheduleCallComponent } from './schedule-call/schedule-call.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleMeetingComponent } from './schedule_meeting/schedule_meeting.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmailsComponent } from './emails/emails.component';
import { MatChipsModule } from '@angular/material/chips'


@NgModule({
  declarations: [DragDirective, FileUploaderComponent, ScheduleCallComponent, ScheduleMeetingComponent, EmailsComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule, 
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule ,
    FormsModule,
    MatChipsModule
    
  ], providers:[DatePipe]
})
export class ComponentsModule { }
