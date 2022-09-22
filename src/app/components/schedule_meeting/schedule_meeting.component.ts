import { animation } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { slideInLeft, slideOutRight } from '@pristine/animations/slide';
import { SessionManagement } from '@pristine/process/SessionManagement';
import * as data from 'assets/static.json';
import { ComponentsService } from '../components.service';

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule_meeting.component.html',
  animations:[slideInLeft, slideOutRight]
})
export class ScheduleMeetingComponent implements OnInit {

  jsonData= data
  userListFiltered: Array<any> =[]
  userList: Array<any> =[]
  timeArray: Array<string> =[]
  calltoList: Array<string> =['contact','lead']
  formGroup: FormGroup
  today: Date = new Date()
  activeTemp:string =''
  userEmail: string =this._session.getEmail
  participantsList=[]
  participantsDetailsList=[]
  participantsShowList=[]
  selectedParticipantType:string ='lead'
  participantSearchKey: string =''
  leadList:Array<any>=[]
  filterdLeadList:Array<any>=[]
  contactList:Array<any>=[]
  showSelectedParticipant='all'
  dealOrAcc:string = 'account'
  constructor(
    private _fb: FormBuilder,
    private _session: SessionManagement,
    private _datepipe: DatePipe,
    private componentService: ComponentsService,
    @Inject(MAT_DIALOG_DATA) public digdata: any 
    ) { 
      this.timeArray = [...this.jsonData.timeArray]
    }

  ngOnInit(): void {  
    this.componentService.userList.subscribe(res=>{
      this.userListFiltered=[]
      this.userList=[]
      for(let i=0; i< res?.length; i++){
        this.userListFiltered.push({email:res[i]['email'],name:res[i]['name']})
         console.log(this.formGroup.get('meeting_host').value )
        if(this.formGroup.get('meeting_host').value == ''){
          this.formGroup.get('meeting_host').setValue(this.userListFiltered[i])
          console.log(this.formGroup.get('meeting_host').value == this.userListFiltered[i])
        }
       
        this.userList.push({email:res[i]['email'],name:res[i]['name'], source:'', 
        checked:this.participantsList?.indexOf(res[i]['email'])>=0})
      }
      
    })
    this.componentService.LeadList.subscribe(res=>{
      this.leadList=[]
      for(let i=0; i< res?.length; i++){
        
        this.leadList.push({email:res[i]['email'],name:res[i]['first_name']+' '+res[i]['last_name'], source:res[i]['company'], code:res[i]['lead_code'],
        checked:this.participantsList?.indexOf(res[i]['email'])>=0})
        
        this.filterdLeadList.push({email:res[i]['email'],name:res[i]['first_name']+' '+res[i]['last_name'], source:res[i]['company']})
        console.log(this.participantsList?.indexOf(res[i]['email'])>=0)
      }
      console.log( this.leadList)
      this.participantsShowList= this.leadList
    })

    console.log(this.getCurrentClosestTime)
    this.componentService.getUsersList ()
    console.log(this._session.getName)
    this.formGroup = this._fb.group({
      title: [''],
      location: [''],
      allDay:[false],
      meeting_start_date: [this.today, Validators.required],
      meeting_start_time: [this.getCurrentClosestTime],
      meeting_end_date: [this.today, Validators.required],
      meeting_end_time: [this.getCurrentClosestTime],
      meeting_host: [''],
      meeting_related_to:[''],
      meeting_related_to_email:[''],
      dealOrAcc:[''],
      deal_account:[],
      repeat:[''],
      remind_participant:[''],
      description:['']
    })

    // {email:this._session.getEmail,name:this._session.getName}
    this.componentService.getUsersList()
    this.componentService.getLeadList('')
  }

  setFocus(ele){
    setTimeout(()=>{
    ele.focus();console.log(ele.nativeElement)},100)
    
  }


  get getCurrentClosestTime(){
    let x = new Date()
    x.setMinutes(0)
    console.log(x.toLocaleTimeString())
    let hrs='00'
    let mins=x.getMinutes()<30?'30':'00'
    let meridiem = ''
    if(x.getHours()>12 ){
      hrs = ("0"+(x.getHours()-Number((x.getMinutes()<30?12:11)))).toString().slice(-2)
      meridiem = 'PM'
    }else if(x.getHours()==12 ){
      hrs= x.getMinutes()<30?'12':'01';
      meridiem = 'PM'
    }else{
      meridiem='AM'
      hrs = x.getHours()==0?'12':("0"+x.getHours()).toString()?.slice(-2)
    }
    //   hrs = x.getHours()<=12? ("0"+(x.getHours()+Number((x.getMinutes()<30?0:
    //   x.getHours()==12?(-11):1)))).toString().slice(-2):("0"+(x.getHours()-Number((x.getMinutes()<30?12:11)))).toString().slice(-2)

    // meridiem =( (x.getHours()>12) || ( x.getHours()==12 && x.getMinutes()>=30)) ?'PM':'AM'
    return  hrs+':'+mins+' '+meridiem
  }

  switchParticipantList(type){
    this.showSelectedParticipant = type
    if(this.showSelectedParticipant=='selected'){
      this.participantsShowList= this.participantsDetailsList
      return
    }
    console.log(this.selectedParticipantType)
    if(this.selectedParticipantType=='lead'){
      this.componentService.getLeadList(this.participantSearchKey)
      // this.participantsShowList= this.leadList
    }else if(this.selectedParticipantType=='contact'){
      this.participantsShowList= this.contactList
    }else if(this.selectedParticipantType=='user'){
      this.participantsShowList= this.userList
    }
    this.participantSearchKey=''
  }

  getValues(){
    console.log(this.formGroup.value)
  }

  toggleAllday(isChecked){
    if(isChecked){
      this.formGroup.get('meeting_start_time').setValue('')
      this.formGroup.get('meeting_end_time').setValue('')
    }else{
      this.formGroup.get('meeting_start_time').setValue(this.getCurrentClosestTime)
      this.formGroup.get('meeting_end_time').setValue(this.getCurrentClosestTime)
    }
  }


  addParticipants(element){
    let ind =this.participantsList.indexOf(element.email)
    if(ind<0){
      this.participantsList.push(element?.email)
      this.participantsDetailsList.push(element)
    }else if(!element.checked){
      this.participantsList.splice(ind,1)
      this.participantsDetailsList.splice(ind,1)
    }
    else{
      this.participantsList.splice(ind,1)
      this.participantsDetailsList.splice(ind,1)
    }
    console.log(this.participantsList)
  }

  dropDownSearchFilter(value, source){
    if(source=='owner'){
      let res=this.componentService.userList.value
      if(value==''){
        this.userListFiltered=[]
        for(let i=0; i< res?.length; i++){
          this.userListFiltered.push({email:res[i]['email'],name:res[i]['name']})
        }
      }else{
        this.userListFiltered = res.filter(ele=>{
         
          return (ele?.email.toLowerCase().includes(value.toLowerCase() ) 
          || ele?.name.toLowerCase().includes(value.toLowerCase() ))?{email:ele['email'],name:ele['name']}:false
        })
      }
    }else if(source=='participant'){
      if(this.selectedParticipantType=='lead'){
        this.componentService.getLeadList(this.participantSearchKey)
      }
    }else  if(source=='lead'){
      this.componentService.getLeadList(value)
    }
  }

  resetDropDowns(ele){
    ele.value=''
  }

  convertToTime(_12hr){
   
    let arr = _12hr.split(/[\s:]+/g)
    arr[0]= arr[2]=='PM'?Number(arr[0])+12:arr[0]
    return arr[0]+':'+arr[1]+':00:000'
  }

  SaveMeeting(){
    let json= {
      flag: 'Insert',
      code: '',
      name: this.formGroup.get('title').value,
      location: this.formGroup.get('location').value,
      all_day: this.formGroup.get('allDay').value?1:0,
      from_datetime: this._datepipe.transform(this.formGroup.get('meeting_start_date').value, 'yyyy-MM-dd')+'T'+this.convertToTime(this.formGroup.get('meeting_start_time').value),
      to_datetime: this._datepipe.transform(this.formGroup.get('meeting_end_date').value, 'yyyy-MM-dd')+'T'+this.convertToTime(this.formGroup.get('meeting_end_time').value),
      meeting_owner: this.formGroup.get('meeting_host').value?.email,
      meeting_owner_name: this.formGroup.get('meeting_host').value?.name,
      participants: this.participantsList?.toString(),
      process_type: this.formGroup.get('meeting_related_to').value, 
      process_code: this.formGroup.get('meeting_related_to').value!=''?this.formGroup.get('meeting_related_to_email').value?.code:'',
      repeat: this.formGroup.get('repeat').value==''?0:1,
      repeat_all_day: this.formGroup.get('allDay').value?1:0,
      repeat_from_date: this._datepipe.transform(this.formGroup.get('meeting_start_date').value, 'yyyy-MM-dd')+'T'+this.convertToTime(this.formGroup.get('meeting_start_time').value),
      repeat_to_date: this._datepipe.transform(this.formGroup.get('meeting_end_date').value, 'yyyy-MM-dd')+'T'+this.convertToTime(this.formGroup.get('meeting_end_time').value),
      repeat_type: this.formGroup.get('repeat').value,
      participants_reminder: this.formGroup.get('remind_participant').value,
      description: this.formGroup.get('description').value, 
      created_by: this._session.getEmail,
      //created_on: this.formGroup.get().value,
      calender_id: '',
      event_id: '',
      meeting_link: '',
      account_code: (this.formGroup.get('meeting_related_to').value=='contact' && this.formGroup.get('dealOrAcc').value=='account')?this.formGroup.get('deal_account').value:'',
      deal_code:(this.formGroup.get('meeting_related_to').value=='contact' && this.formGroup.get('dealOrAcc').value=='deal')?this.formGroup.get('deal_account').value:'',
    }
    console.log(json)
    // this.componentService.newMeeting(json)
  }



  print(){
    console.log(this.formGroup.get('meeting_host').value)
    console.log(typeof this.formGroup.get('meeting_host').value)
  }
}
