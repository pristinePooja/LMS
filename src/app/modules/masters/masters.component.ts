import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawerContent } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { countryListModel } from 'app/model/mstcountryModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MastersService } from './masters.service';
import { WebApiHttp } from '@pristine/process/WebApiHttp.services'

@Component({
    selector: 'app-masters',
    templateUrl: './masters.component.html',
    styleUrls: ['./masters.component.scss']
})

export class MastersComponent implements OnInit {
    filterOpen: boolean = true;
    saveChanges: boolean = false;
    @ViewChild('drawer', { static: true }) drawer: ElementRef<any>
    @ViewChild('paginatorRef', { static: false }) paginator: MatPaginator
    view: boolean = true
    headerData: any = { type: 'filter', active: this.filterOpen, icon: 'filter', url: '' };
    listData: MatTableDataSource<countryListModel> = new MatTableDataSource<countryListModel>([])
    displayedColumns: string[] = ['country_code', 'country_name', 'currency', 'currency_icon']
    countryList:Array<countryListModel>=[]
    paggedData = []
    pageNo: number = 0;
    pageSize: number = 10;
    totalCount: number = 0
    pageType: 'list' | 'create' | 'view' | 'edit' = 'list'
    panelType: 'filter' | 'list' = 'filter'
    viewFilterOpen: boolean = true
    constructor(private _mastersService: MastersService,
        private _spinner: NgxSpinnerService,
        private _toaster: ToastrService,
        private _webAPi: WebApiHttp
    ) { }

    ngOnInit(): void {
        this._webAPi.Get(this._webAPi.ApiURLArray.getCountryMst).then(res=>{
            this.countryList= res ; 
            this.listData = new MatTableDataSource<countryListModel>(this.countryList); 
            this.listData.paginator = this.paginator 
        });
        
        
        // this.pageType = 'list'
        this._mastersService.pageType.subscribe(res => {
            console.log(res)
            this.pageType = res
            if(res=='view'){
              this.panelType = 'list'
              this.headerData = {
                type:'back', active:false, icon:'',url:'showList'
              }
            }else{
              this.panelType = 'filter'
              this.headerData={type:'filter',active:this.filterOpen, icon:'filter',
              filterOptions :['All','None', 'Some value 1', 'Some value 2'],url:''};
            }  
        })
        this._mastersService.toaster.subscribe(res => {
            console.log(res)
            if (res.type == 'error') {
                this._toaster.error(res.message, 'Error')
                this._mastersService.toaster.next({ type: '', message: '' })
            } else if (res.type == 'success') {
                this._toaster.success(res.message, 'Success')
                this._mastersService.toaster.next({ type: '', message: '' })
            } else if (res.type == 'info') {
                this._toaster.info(res.message)
                this._mastersService.toaster.next({ type: '', message: '' })
            } else if (res.type == 'warn') {
                this._toaster.warning(res.message)
                this._mastersService.toaster.next({ type: '', message: '' })
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

    changePage(){
        
        this.paggedData = this.listData.data.slice((Number(this.paginator.pageSize) * Number(this.paginator.pageIndex)),
        Number(this.paginator.pageSize) * Number(this.paginator.pageIndex+1))
        console.log(this.paggedData)
      }


    getToggler($event: any) {
        this.filterOpen = $event
    }

}