import { animation } from '@angular/animations';
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
  activeTemp:string ='participant'
  userEmail: string =this._session.getEmail
  participantsList=[]
  participantsShowList=[]
  selectedParticipantType:string ='lead'
  participantSearchKey: string =''
  leadList:Array<any>=[]
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
      this.userListFiltered=[]
      for(let i=0; i< res?.length; i++){
        this.userListFiltered.push({email:res[i]['email'],name:res[i]['name']})
      }
      
    })
    this.componentService.LeadList.subscribe(res=>{
      this.leadList=[]
      console.log(this.participantsList)
      for(let i=0; i< res?.length; i++){
        this.leadList.push({email:res[i]['email'],name:res[i]['first_name']+' '+res[i]['last_name'], source:res[i]['company'], 
        checked:this.participantsList?.indexOf(res[i]['email'])>=0})
      }
      console.log( this.leadList)
      this.participantsShowList= this.leadList
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
      meeting_host: [],
    })
    this.componentService.getUsersList()
    this.componentService.getLeadList('')
  }

  setFocus(ele){
    setTimeout(()=>{
    ele.focus();console.log(ele.nativeElement)},100)
    
  }

  switchParticipantList(){
    if(this.selectedParticipantType=='lead'){
      this.participantsShowList= this.leadList
    }

  }

  getValues(){
    console.log(this.formGroup.value)
  }


  addParticipants(){

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
    }
  }

  resetDropDowns(ele){
    ele.value=''
  }


}
