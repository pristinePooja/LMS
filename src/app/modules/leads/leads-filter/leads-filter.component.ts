import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {expandCollapse} from '@pristine/animations/expand-collapse';
import { LeadsService } from '../leads.service';


@Component({
    selector: 'app-leads-filter',
    templateUrl: './leads-filter.component.html',
    styleUrls: ['./leads-filter.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        expandCollapse
    ]
})
export class LeadsFilterComponent implements OnInit {

    constructor(private _leadService: LeadsService) {
    }

    clearData: string = ''
    filterSearch: string = ''
    filterArray: Array<any> = []
    filteredValues: Array<any> = []
    filterOptions={
         'string':[
                "is",
                "isn't",
                "contains",
                "dosen't contain",
                "starts with",
                "ends with",
                "is empty",
                "is not empty",
            ] ,
        'number' : [
                    "=",
                    "!=",
                    "<",
                    "<=",
                    ">",
                    ">=",
                    "between",
                    "not between",
                    "is empty",
                    "is not empty"
                ]
    }
    ngOnInit(): void {
        this.resetAllFilters()
    }

    clearFilter() {
        this.filterSearch = ''
        setTimeout(() => {
            this.clearData = ''
        }, 600)
    }

    filter() {
        this.filteredValues = this.filterArray.filter(item => {
            return item.name.includes(this.filterSearch)
        })
    }

    applyFilter(){
        let temp_filter = this.filterArray.filter(ele=>ele.open)
        this._leadService.filterFormater(temp_filter)
    }

    resetAllFilters() {
        this.filterArray = []
        let temp = [
            {key: "lead_owner", type: 'string'},
            {key: "company", type: 'string'},
            {key: "first_name", type: 'string'},
            {key: "last_name", type: 'string'},
            {key: "title", type: 'string'},
            {key: "email", type: 'string'},
            {key: "fax", type: 'string'},
            {key: "phone", type: 'string'},
            {key: "mobile", type: 'string'},
            {key: "website", type: 'string'},
            {key: "lead_source", type: 'string'},
            {key: "lead_status", type: 'string'},
            {key: "industry", type: 'string'},
            {key: "no_of_employees", type: 'string'},
            {key: "annual_revenue", type: 'number'},
            {key: "rating", type: 'number'},
            {key: "email_opt_out", type: 'boolean'},
            {key: "skype_id", type: 'string'},
            {key: "secondary_email", type: 'string'},
            {key: "twitter", type: 'string'},
            {key: "street", type: 'string'},
            {key: "city", type: 'string'},
            {key: "state", type: 'string'},
            {key: "zipcode", type: 'string'},
            {key: "country", type: 'string'},
            {key: "description", type: 'string'},
            {key: "created_by", type: 'string'}
        ]

        for (let i = 0; i < temp.length; i++) {
            this.filterArray.push(
                {
                    name: temp[i]['key'].replace('_', ' ').toString(),
                    key: temp[i]['key'],
                    type: temp[i]['type'],
                    value: '',
                    val2:'',
                    selected_filter:'',
                    open: false
                })
        }
        this.filteredValues = this.filterArray
    }

    con($event){
      console.log($event)
    }
}
