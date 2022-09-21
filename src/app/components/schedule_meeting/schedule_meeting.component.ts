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
        this.userList.push({email:res[i]['email'],name:res[i]['name'], source:'', 
        checked:this.participantsList?.indexOf(res[i]['email'])>=0})
      }
      
    })
    this.componentService.LeadList.subscribe(res=>{
      this.leadList=[]
      console.log(this.participantsList)
      for(let i=0; i< res?.length; i++){
        
        this.leadList.push({email:res[i]['email'],name:res[i]['first_name']+' '+res[i]['last_name'], source:res[i]['company'], lead_code:res[i]['lead_code'],
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
      meeting_host: [{email:this._session.getEmail,name:this._session.getName}],
      meeting_related_to:[''],
      meeting_related_to_email:[''],
      dealOrAcc:[''],
      deal_account:[],
      repeat:[],
      repeat_all_day:[false],
      repeat_from_date:[this.today],
      repeat_to_date:[this.today],
      repeat_from_time:[this.getCurrentClosestTime],
      repeat_to_time:[this.getCurrentClosestTime],
    })
    this.componentService.getUsersList()
    this.componentService.getLeadList('')
  }

  setFocus(ele){
    setTimeout(()=>{
    ele.focus();console.log(ele.nativeElement)},100)
    
  }


  get getCurrentClosestTime(){
    let x = new Date()
    return (("0"+(x.getHours()-Number((x.getMinutes()<30?12:11)))).toString().slice(-2)+':'+(x.getMinutes()<30?'30':'00')+' '+((x.getHours()>=12)?'PM':'AM'))

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


}
