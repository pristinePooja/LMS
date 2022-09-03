import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { slideInLeft, slideInRight } from '@pristine/animations/slide';
import { leadListModel } from 'app/model/LeadsModel';
import { PristineAnimationCurves, PristineAnimationDurations } from '@pristine/animations/defaults';
import { LeadsService } from '../leads.service';
import { HeaderService } from '@pristine/components/header/header.service';

@Component({
  selector: 'leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations:[
      slideInLeft    ]
})
export class LeadsListComponent implements OnInit {

  constructor(private _leadService: LeadsService, private _headerService: HeaderService) { }
  view: string = 'list';
  dataState:'void'|'*' ='void'
  private _dataArray:Array<leadListModel>=[]
  @Input() set DataArray(data:  Array<leadListModel>) {
    this.dataState = '*';
    this._dataArray = data;
  }

  get DataArray(){return this._dataArray}
  ngOnInit(): void {
    console.log(this._dataArray)
  }

  edit(ele){
    this._leadService.selectedLead.next({all: ele, header:''})
    this._leadService.pageType.next('edit')
    this._headerService.switchView.next({type:'edit', value:true})
  }

  viewDetails(ele){
    console.log(ele)
    this._leadService.getLeadDetails(ele)
    this._leadService.pageType.next('view')
  }
}
