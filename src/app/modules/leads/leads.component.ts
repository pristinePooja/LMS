import {Component, ElementRef, OnInit, AfterViewInit,ViewChild, ViewEncapsulation} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawerContent } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { leadListModel } from 'app/model/LeadsModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LeadsService } from './leads.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LeadsComponent implements OnInit,AfterViewInit {
    filterOpen:boolean = true;
    saveChanges:boolean = false;
    @ViewChild('drawer', {static: true}) drawer: ElementRef<any>
    @ViewChild('paginatorRef', {static: false}) paginator: MatPaginator
    view:boolean= true
    headerData: any={type:'filter',active:this.filterOpen, icon:'filter',url:''};
    listData: MatTableDataSource<leadListModel> =new MatTableDataSource<leadListModel>([])
    paggedData=[]
    pageNo: number = 0;
    pageSize : number = 10;
    totalCount : number = 0
  constructor(private _leadService: LeadsService, 
              private _spinner: NgxSpinnerService,
              private _toaster: ToastrService
              ) { }

  ngOnInit(): void {
    this.listData = new MatTableDataSource<leadListModel>([])
    this.listData.paginator = this.paginator

    this._leadService.toaster.subscribe(res=>{
      console.log(res)
      if(res.type=='error'){
        this._toaster.error(res.message, 'Error')
        this._leadService.toaster.next({type:'', message:''})
      }else if(res.type=='success'){
        this._toaster.success(res.message, 'Success')
        this._leadService.toaster.next({type:'', message:''})
      }else if(res.type=='info'){
        this._toaster.info(res.message)
        this._leadService.toaster.next({type:'', message:''})
      }else if(res.type=='warn'){
        this._toaster.warning(res.message)
        this._leadService.toaster.next({type:'', message:''})
      }
    })

    this._leadService.loading.subscribe(res=>{
      console.log(res)
      if(res){
        this._spinner.show()
      }else{ this._spinner.hide()}
    })

    this._leadService.pageNo.subscribe(res=>{
      console.log(res,'page no')
      this.pageNo = res
    })

    this._leadService.pageSize.subscribe(res=>{
      console.log(res)
      this.pageSize = res
    })
    
    this._leadService.leadLists.subscribe(res=>{
      console.log(res ,'gg')
      this.totalCount = res?.totalCount?res?.totalCount:0
      this.listData = new MatTableDataSource<leadListModel>(res.items?res.items:[])
      this.paggedData = res.items?res.items:[]
    })
    this._leadService.getLeadList()
  }

  ngAfterViewInit() {
  }

  page(event){
    this._leadService.pageNo.next(event.pageIndex);
    this._leadService.pageSize.next(event.pageSize);
    this._leadService.getLeadList()
  }

  changePage(){
    this._leadService.getLeadList()
    this.paggedData = this.listData.data.slice((Number(this.paginator.pageSize) * Number(this.paginator.pageIndex)),
    Number(this.paginator.pageSize) * Number(this.paginator.pageIndex+1))
    console.log(this.paggedData)
  }

    getTOggler($event: any) {
        this.filterOpen = $event
    }

    switchView($event){
      if($event.source=='view'){
        this.view=$event.bool      
      }
      if($event.source=='save'){
        this._leadService.saveFile.next($event.bool)
        // this.saveChanges = $event.bool       
      }

    }
}
