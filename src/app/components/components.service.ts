import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WebApiHttp } from '@pristine/process/WebApiHttp.services';
import { BehaviorSubject } from 'rxjs';
import { ScheduleCallComponent } from './schedule-call/schedule-call.component';
import { ScheduleMeetingComponent } from './schedule_meeting/schedule_meeting.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor( 
    private _dialog: MatDialog,
    private _webApiHttp: WebApiHttp,
    ) { }
  LeadList : BehaviorSubject<any> = new BehaviorSubject<any>('') 
  userList : BehaviorSubject<any> = new BehaviorSubject<any>('') 
  contactList : BehaviorSubject<any> = new BehaviorSubject<any>('') 
  accountList : BehaviorSubject<any> = new BehaviorSubject<any>('') 
  openCallPopUp(type){
    console.log(type)
    this._dialog.open(ScheduleCallComponent,{
      maxWidth:'680px',
      width:'680px',
      minWidth:'480px',
      position: {'top':'3rem'}, 
      panelClass:'top-popUp-panel', data:{type:type}})
  }
  openMeetingPopUp(type){
    console.log(type +'fghjkl')
    this._dialog.open(ScheduleMeetingComponent,{
      maxWidth:'680px',
      width:'680px',
      minWidth:'480px',
      position: {'top':'3rem'}, 
      panelClass:'top-popUp-panel', data:{type:type}})
  }

  getLeads(name){
    let json = {
      sorting_column: 'first_name,last_name',
      last_name: ' like %'+name+'%',
      first_name: ' like %'+name+'%'
    }
    this._webApiHttp.Post(this._webApiHttp.ApiURLArray.getLeadList+'0&pageSize=10', json).then(res=>{
      if(Number(res?.totalCount)>0){
        this.LeadList.next(res?.items)
      }else{
        if(res?.length>0 && res[0]?.hasOwnProperty('condition')  && res[0]?.condition.toLowerCase() =='false'){
          console.log('error')
          this.LeadList.next([])
        }
      }
    })
  }


  getUsersList(){
    this._webApiHttp.Get(this._webApiHttp.ApiURLArray.getAllUsers).then(res=>{
      if(res[0]?.condition.toLowerCase()=='true'){
        this.userList.next(res);
      }else{
        this.userList.next([]);
      }
    })
  }

}