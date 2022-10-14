import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { WebApiHttp } from "@pristine/process/WebApiHttp.services";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { MastersService } from "../masters.service";

@Component({
  selector: 'app-gst-setup',
  templateUrl: 'gst-setup.component.html',
  styleUrls: ['gst-setup.component.scss']
})

export class GstSetupComponenet implements OnInit {

  filterOpen: boolean = true;
  saveChanges: boolean = false;
  @ViewChild('drawer', { static: true }) drawer: ElementRef<any>
  @ViewChild('paginatorRef', { static: false }) paginator: MatPaginator
  view: boolean = true
  headerData: any = { type: 'filter', active: this.filterOpen, icon: 'filter', url: '' };
  listData: MatTableDataSource<any> = new MatTableDataSource<any>([])
  displayedColumns: string[] = ['nav_seq_no', 'gst_state_code', 'gst_state_name', 'gst_group_id',
    'name', 'gst_component_code', 'percentage', 'effective_date', 'gst_jurisdiction_type', 'updated_on']
  GstSetupList: Array<any> = []
  paggedData = []
  pageNo: number = 0;
  pageSize: number = 10;
  totalCount: number = 0
  pageType: 'list' | 'create' | 'view' | 'edit' = 'list'
  panelType: 'filter' | 'list' = 'filter'
  viewFilterOpen: boolean = true
  constructor(
    private _mastersService: MastersService,
    private _spinner: NgxSpinnerService,
    private _toaster: ToastrService,
    private _webAPi: WebApiHttp
  ) { }

  ngOnInit(): void {
    this._spinner.show()
    this._webAPi.Get(this._webAPi.ApiURLArray.getGStSetup).then(result => {
      console.log(result);
      this.GstSetupList = result;
      this.listData = new MatTableDataSource<any>(this.GstSetupList)
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