import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionManagement } from '@pristine/process/SessionManagement';
import * as data from 'assets/static.json';

@Component({
  selector: 'app-schedule-call',
  templateUrl: './schedule-call.component.html'
})
export class ScheduleCallComponent implements OnInit {

  jsonData= data
  type: 'log'|'schedule'|'create' ='log'
  callToArray: Array<any> =[]
  callToArrayfiltered: Array<any> =[]
  timeArray: Array<string> =[]
  callOwnerList: Array<any> =[]
  callToList: Array<any> =[]
  relatedToList: Array<any> =[]
  callPurposeList: Array<any>=[]
  callResultList: Array<any>=[]
  calltoList: Array<string> =['contact','lead']
  callStatus: Array<string> =['Outbound','Inbound','Missed']
  formGroup: FormGroup
  
  constructor(
    private _fb: FormBuilder,
    private _session: SessionManagement,
    @Inject(MAT_DIALOG_DATA) public digdata: any 
    ) { }

  ngOnInit(): void {   
    this.type = this.digdata.type 
    this.timeArray = [...this.jsonData.timeArray]
    this.callPurposeList = [...this.jsonData.call_purpose_values]
    this.callResultList = [...this.jsonData.call_results]

    this.formGroup = this._fb.group({
      call_to_type: ['', Validators.required],
      call_to: ['', Validators.required],
      related_to_type: [''],
      related_to: [''],
      call_type: ['Outbound', Validators.required],
      outbound_call_status: ['Scheduled'],
      call_start_date: ['', Validators.required],
      call_start_time: ['', Validators.required],
      call_duration_hours:['00'],
      call_duration_seconds:['00'],
      call_owner: [''],
      subject:[''],
      reminder: [''],
      call_purpose:[''],
      call_agenda:[''],
      call_result:[''],
      call_result_description:[''],
      Description:['']
    })
  }

  setFocus(ele){
    setTimeout(()=>{
    ele.focus();console.log(ele.nativeElement)},100)
    
  }

  getValues(){
    console.log(this.formGroup.value)
  }

  setDefaultValues(){
    this.formGroup.reset();
    if(this.type=='schedule'){
      this.formGroup.get('call_to_type').setValue(this.digdata?.src=='lead'?'lead': 'contact')
      this.formGroup.get('call_to').setValue(this.digdata?.userCode)
      this.formGroup.get('call_type').setValue('Outbound')
      this.formGroup.get('outbound_call_status').setValue('Scheduled')
      this.formGroup.get('call_owner').setValue(this._session.getEmail)
    }else if(this.type=='log'){
      this.formGroup.get('call_to_type').setValue(this.digdata?.src=='lead'?'lead': 'contact')
      this.formGroup.get('call_to').setValue(this.digdata?.userCode)
      this.formGroup.get('outbound_call_status').setValue('Completed')
      this.formGroup.get('call_owner').setValue(this._session.getEmail)
    }
  }

  dropDownSearchFilter(value, source){
    if(source=='owner'){
      if(value==''){
      this.callToArrayfiltered = this.callToArray
      }else{
        this.callToArrayfiltered = this.callToArray.filter(ele=>{
         
          return ele?.country_name.toLowerCase().includes(value.toLowerCase() )
        })
      }
    }else{}
  }

  resetDropDowns(ele){
    ele.value=''
  }


  validateNumericValue(event){
    let val = [...event.target.value].reduce((x,y)=> ('0123456789').includes(y)? x+y:x,'')
   return val

  }
}
