import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DragDirective } from '@pristine/directives/dragDrop.directive';
import { ScheduleCallComponent } from './schedule-call/schedule-call.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';



@NgModule({
  declarations: [DragDirective, FileUploaderComponent, ScheduleCallComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule, 
  ]
})
export class ComponentsModule { }
