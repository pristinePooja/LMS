import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('titleRef', {static:false}) titelRef: ElementRef<any>
  activeClass: string='border-solid border rounded-3xl border-sky-400 bg-sky-50'
  nextDates:Array<any>[]
  date: Date = new Date()
  timeSelected : any
  timeArray:Array<{name:string, value:string}>=[]
  showDets: boolean = true;
  addNotes: boolean = false
  addTitle: boolean = false
  remarkText:string =''
  titleText: string =''
  constructor(private _leadService: LeadsService,
              private _datePipe: DatePipe) { }

  ngOnInit(): void {
    this._leadService.viewFilterOpen.subscribe(res=>{
      this.sidePanelOpen = res
    })
    for(let i=0; i< 6; i++){
      let d: Date =this.date
      if(i==0){
            this.timeArray.push({name:'Today', value:this._datePipe.transform(d,'yyyy/MM/dd') })
      d.setDate(this.date.getDate()+1)
    }else if(i==1){
          this.timeArray.push({name:'Tomorrow', value:this._datePipe.transform(d,'yyyy/MM/dd') })
      d.setDate(this.date.getDate()+1)
    }else{
    this.timeArray.push({name:this._datePipe.transform(d,'EEE, MMM dd'), value:this._datePipe.transform(d,'yyyy/MM/dd') })}
    d.setDate(this.date.getDate()+1)
    }
    this.timeSelected = this.timeArray[0]

  }
  openSidePanel(){
    this._leadService.viewFilterOpen.next(true)
  }

  setNoteTitle(){
    this.addTitle = true
    setTimeout(()=>{this.titelRef.nativeElement.focus()},300)
  }

}
