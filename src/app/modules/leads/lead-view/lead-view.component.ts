import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LeadsService } from '../leads.service';

@Component({
  selector: 'lead-view',
  templateUrl: './lead-view.component.html',
  styleUrls: ['./lead-view.component.scss']
})
export class LeadViewComponent implements OnInit {

  sidePanelOpen: boolean= false
  active: string ='overview';
  @Input() viewDetailsData: any =''
  activeClass: string='border-solid border rounded-3xl border-sky-400 bg-sky-50'
  nextDates:Array<any>[]
  date: Date = new Date()
  timeSelected : any
  timeArray:Array<{name:string, value:string}>=[]
  showDets: boolean = true
  constructor(private _leadService: LeadsService,
              private _datePipe: DatePipe) { }

  ngOnInit(): void {
    this._leadService.viewFilterOpen.subscribe(res=>{
      console.log(res)
      this.sidePanelOpen = res
    })
    for(let i=0; i< 6; i++){
      let d: Date =this.date
      if(i==0){
        console.log(d,i)
      this.timeArray.push({name:'Today', value:this._datePipe.transform(d,'yyyy/MM/dd') })
      d.setDate(this.date.getDate()+1)
    }else if(i==1){
      console.log(d,i)

      this.timeArray.push({name:'Tomorrow', value:this._datePipe.transform(d,'yyyy/MM/dd') })
      d.setDate(this.date.getDate()+1)
    }else{
    console.log(d,i)
  
    this.timeArray.push({name:this._datePipe.transform(d,'EEE, MMM dd'), value:this._datePipe.transform(d,'yyyy/MM/dd') })}
    d.setDate(this.date.getDate()+1)
    }
    this.timeSelected = this.timeArray[0]
    console.log(this.timeArray)
  }
  openSidePanel(){
    this._leadService.viewFilterOpen.next(true)
  }

}
