import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LeadsListComponent implements OnInit {

  constructor() { }
  clearData: string = ''
  filterSearch: string=''
  filterArray: Array<any>=[50,100,200,'a200',600,50,900,200,100]
  ngOnInit(): void {
  }

  clearFilter(){
  this.clearData ='animate-spin'
  this.filterSearch =''
  setTimeout(()=>{
    this.clearData =''
  },600)
  }
}
