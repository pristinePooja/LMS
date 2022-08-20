import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { slideInLeft, slideInRight } from '@pristine/animations/slide';
import { leadListModel } from 'app/model/LeadsModel';
import { PristineAnimationCurves, PristineAnimationDurations } from '@pristine/animations/defaults';

@Component({
  selector: 'leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations:[
      slideInLeft    ]
})
export class LeadsListComponent implements OnInit {

  constructor() { }
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

}
