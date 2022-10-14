import { animation } from "@angular/animations";
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { expandCollapse } from "@pristine/animations/expand-collapse";
import { WebApiHttp } from "@pristine/process/WebApiHttp.services";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { MastersService } from "../masters.service";

@Component({
    selector: 'app-gst-hsn',
    templateUrl: 'gst-hsn.component.html',
    styleUrls: ['gst-hsn.component.scss'],
    encapsulation: ViewEncapsulation.None   
})

export class GstHsnComponent implements OnInit {

    filterOpen: boolean = true;
    saveChanges: boolean = false;
    @ViewChild('drawer', { static: true }) drawer: ElementRef<any>
    @ViewChild('paginatorRef', { static: false }) paginator: MatPaginator
    view: boolean = true
    headerData: any = { type: 'filter', active: this.filterOpen, icon: 'filter', url: '' };
    listData: MatTableDataSource<any> = new MatTableDataSource<any>([])
    gstHsnList: Array<any> = []
    paggedData = []
    pageNo: number = 0;
    pageSize: number = 10;
    totalCount: number = 0
    pageType: 'list' | 'create' | 'view' | 'edit' = 'list'
    panelType: 'filter' | 'list' = 'filter'
    viewFilterOpen: boolean = true

    displayedColumns: string[] = ['hsn_id', 'gst_group_id', 'description', 'type',]

    constructor(
        private _mastersService: MastersService,
        private _spinner: NgxSpinnerService,
        private _toaster: ToastrService,
        private _webAPi: WebApiHttp
    ) { }

    ngOnInit(): void {
        this._spinner.show()
        this._webAPi.Get(this._webAPi.ApiURLArray.getGstHsnMst).then(result => {
            console.log(result);
            this.gstHsnList = result;
            this.listData = new MatTableDataSource<any>(this.gstHsnList)
            this.listData.paginator = this.paginator
            this._spinner.hide()
        })

        this._mastersService.pageType.subscribe(res => {
            console.log(res)
            this.pageType = res
            if (res == 'view') {
                this.panelType = 'list'
                this.headerData = {
                    type: 'back', active: false, icon: '', url: 'showList'
                }
            } else {
                this.panelType = 'filter'
                this.headerData = {
                    type: 'filter', active: this.filterOpen, icon: 'filter',
                    // filterOptions: ['All', 'None', 'Some value 1', 'Some value 2'], url: ''
                };
            }
        })

       
        this._mastersService.pageNo.subscribe(res => {
            console.log(res, 'page no')
            this.pageNo = res
        })

        this._mastersService.pageSize.subscribe(res => {
            console.log(res)
            this.pageSize = res
        })

        this._mastersService.viewFilterOpen.subscribe(res => {
            console.log(res)
            this.viewFilterOpen = res
        })

    }

     

page(event) {
    this._mastersService.pageNo.next(event.pageIndex);
    this._mastersService.pageSize.next(event.pageSize);

}

changePage() {

    this.paggedData = this.listData.data.slice((Number(this.paginator.pageSize) * Number(this.paginator.pageIndex)),
        Number(this.paginator.pageSize) * Number(this.paginator.pageIndex + 1))
    console.log(this.paggedData)
}

getToggler($event: any) {
    this.filterOpen = $event
}


}