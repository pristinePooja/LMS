import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-leads-filter',
  templateUrl: './leads-filter.component.html',
  styleUrls: ['./leads-filter.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LeadsFilterComponent implements OnInit {

  constructor() { }
  clearData: string = ''
  filterSearch: string=''
  filterArray: Array<any>=[50,100,200,'400',600,50,900,200,100]
  ngOnInit(): void {
  }

  clearFilter(){
  // this.clearData ='animate-spin'
  this.filterSearch =''
  setTimeout(()=>{
    this.clearData =''
  },600)
  }
}
