import { Component, OnInit } from '@angular/core';
import { LeadsService } from '../leads.service';

@Component({
  selector: 'lead-view',
  templateUrl: './lead-view.component.html',
  styleUrls: ['./lead-view.component.scss']
})
export class LeadViewComponent implements OnInit {

  sidePanelOpen: boolean= false
  active: string ='overview';
  activeClass: string='border-solid border rounded-3xl border-sky-400 bg-sky-50'
  constructor(private _leadService: LeadsService) { }

  ngOnInit(): void {
    this._leadService.viewFilterOpen.subscribe(res=>{
      console.log(res)
      this.sidePanelOpen = res
    })
  }
  openSidePanel(){
    this._leadService.viewFilterOpen.next(true)
  }

}
