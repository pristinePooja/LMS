import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { expandCollapse } from '@pristine/animations/expand-collapse';
import { leadListModel } from 'app/model/LeadsModel';


@Component({
  selector: 'app-leads-filter',
  templateUrl: './leads-filter.component.html',
  styleUrls: ['./leads-filter.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations:[
      expandCollapse
    ]
})
export class LeadsFilterComponent implements OnInit {

  constructor() { }
  clearData: string = ''
  filterSearch: string=''
  filterArray: Array<any> =[]
  filteredValues: Array<any> =[]
  ngOnInit(): void {
    this.resetAllFilters()
  }

  clearFilter(){
  this.filterSearch =''
  setTimeout(()=>{
    this.clearData =''
  },600)
  }

  filter(){
   this.filteredValues= this.filterArray.filter( item=>{ return item.name.includes(this.filterSearch)})
  }

  resetAllFilters(){
    this.filterArray =[]
    let temp =["lead_owner","company","first_name","last_name","title","email",
    "fax","phone","mobile","website","lead_source","lead_status","industry",
    "no_of_employees","annual_revenue","rating","email_opt_out","skype_id",
    "secondary_email","twitter","street","city","state","zipcode","country",
    "description","created_by"]
    for(let i=0; i<temp.length; i++){
      this.filterArray.push({name:temp[i].replace('_',' ').toString(), key:temp[i], filter:{value:'',options:['equal to', 'includes', 'exclude']},open:false})
    };
    this.filteredValues = this.filterArray
  }
}
