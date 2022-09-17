import { Component, OnInit } from '@angular/core';
import * as data from 'assets/static.json';

@Component({
  selector: 'app-schedule-call',
  templateUrl: './schedule-call.component.html'
})
export class ScheduleCallComponent implements OnInit {

  jsonData= data
  type: string ='log'
  callToArray: Array<any> =[]
  timeArray: Array<string> =[]
  callOwnerList: Array<any> =[]
  callToList: Array<any> =[]
  relatedToList: Array<any> =[]
  callPurposeList: Array<any>=[]
  callResultList: Array<any>=[]
  
  constructor() { }

  ngOnInit(): void {
    
    console.log(...this.jsonData.call_purpose_values,data)
    this.timeArray = [...this.jsonData.timeArray]
    this.callPurposeList = [...this.jsonData.call_purpose_values]
    this.callResultList = [...this.jsonData.call_results]
  }

  setFocus(ele){
    setTimeout(()=>{
    ele.focus();console.log(ele.nativeElement)},100)
    
  }

  dropDownSearchFilter(value, source){
    
  }

  resetDropDowns(ele){}


  validateNumericValue(event){
    let val = [...event.target.value].reduce((x,y)=> ('0123456789').includes(y)? x+y:x,'')
   return val

  }
}
