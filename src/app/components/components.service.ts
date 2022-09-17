import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleCallComponent } from './schedule-call/schedule-call.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor( private _dialog: MatDialog,) { }

  openMeetingPopUp(type){
    this._dialog.open(ScheduleCallComponent,{
      maxWidth:'680px',
      width:'680px',
      minWidth:'480px',
      position: {'top':'3rem'}, 
      panelClass:'top-popUp-panel', data:{type:type}})
  }
}
