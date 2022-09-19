import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionManagement } from '@pristine/process/SessionManagement';
import * as data from 'assets/static.json';
import { ComponentsService } from '../components.service';

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule_meeting.component.html'
})
export class ScheduleMeetingComponent implements OnInit {

  jsonData= data
  type: 'log'|'schedule'|'create' ='log'
  userListFiltered: Array<any> =[]
  userList: Array<any> =[]
  timeArray: Array<string> =[]
  callOwnerList: Array<any> =[]
  callToList: Array<any> =[]
  relatedToList: Array<any> =[]
  callPurposeList: Array<any>=[]
  callResultList: Array<any>=[]
  calltoList: Array<string> =['contact','lead']
  callStatus: Array<string> =['Outbound','Inbound','Missed']
  formGroup: FormGroup
  today: Date = new Date()
  constructor(
    private _fb: FormBuilder,
    private _session: SessionManagement,
    private componentService: ComponentsService,
    @Inject(MAT_DIALOG_DATA) public digdata: any 
    ) { 
      this.timeArray = [...this.jsonData.timeArray]
    }

  ngOnInit(): void {  
    this.componentService.userList.subscribe(res=>{
      this.userListFiltered = res
    })
    this.componentService.getUsersList ()
    this.formGroup = this._fb.group({
      title: [''],
      location: [''],
      allDay:[false],
      meeting_start_date: [this.today, Validators.required],
      meeting_start_time: [],
      meeting_end_date: [this.today, Validators.required],
      meeting_end_time: [],
      meeting_host: [this._session.getEmail]
    })
    this.componentService.getUsersList()
  }

  setFocus(ele){
    setTimeout(()=>{
    ele.focus();console.log(ele.nativeElement)},100)
    
  }

  getValues(){
    console.log(this.formGroup.value)
  }




  dropDownSearchFilter(value, source){
    if(source=='owner'){
      if(value==''){
      this.userListFiltered = this.componentService.userList.value
      }else{
        this.userListFiltered = this.componentService.userList.value.filter(ele=>{
         
          return ele?.email.toLowerCase().includes(value.toLowerCase() ) || ele?.name.toLowerCase().includes(value.toLowerCase() )
        })
      }
    }else{}
  }

  resetDropDowns(ele){
    ele.value=''
  }


}
