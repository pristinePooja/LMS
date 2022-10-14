import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { expandCollapse } from "@pristine/animations/expand-collapse";
import { MastersService } from "../../masters.service";

@Component({
    selector:'gst-setup-filter',
    templateUrl:'gst-setup-filter.component.html',
    styleUrls:['gst-setup-filter.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations:[expandCollapse]
})
export class GstSetupFilterComponent implements OnInit {

    @Input() panel: string = 'filter'

    constructor( private _mastersService: MastersService ){}

    clearData: string = ''
    filterSearch: string = ''
    filterArray: Array<any> = []
    filteredValues: Array<any> = []
    overviewArray: any
    filterOptions = {
        'string': [
            "is",
            "isn't",
            "contains",
            "dosen't contain",
            "starts with",
            "ends with",
            "is empty",
            "is not empty",
        ],
        'number': [
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
        console.log(this.panel)
        
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
        // console.log(this.filteredValues);
        
    }

    applyFilter() {
        // console.log(this.filterArray);
         
        let temp_filter = this.filterArray.filter(ele => ele.open)
        this._mastersService.filterFormater(temp_filter)
    }

    resetAllFilters() {
        this.filterArray = []
        let temp = [
            { key: "nav_seq_no", type: 'string' },
            { key: "gst_state_code", type: 'string' },
            { key: "gst_state_name", type: 'string' },
            { key: "gst_group_id", type: 'string' },
            { key: "name", type: 'string' },
            { key: "gst_component_code", type: 'string' },
            { key: "percentage", type: 'string' },
            { key: "effective_date", type: 'string' },
            { key: "gst_jurisdiction_type", type: 'string' },
            { key: "updated_on", type: 'string' },

        ]

        for (let i = 0; i < temp.length; i++) {
            this.filterArray.push(
                {
                    name: temp[i]['key'].replace('_', ' ').toString(),
                    key: temp[i]['key'],
                    type: temp[i]['type'],
                    value: '',
                    val2: '',
                    selected_filter: '',
                    open: false
                }) 
        }
        this.filteredValues = this.filterArray
    }

    closeSidePanel() {
        this._mastersService.viewFilterOpen.next(false)
    }

    focusOnId(ele) {
        document.getElementById(ele).scrollIntoView()
    }

}