import {Component, ElementRef, OnInit, AfterViewInit,ViewChild, ViewEncapsulation} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawerContent } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { leadListModel } from 'app/model/LeadsModel';
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
  constructor(private _leadService: LeadsService) { }

  ngOnInit(): void {
    this.listData = new MatTableDataSource<leadListModel>([])
    this.listData.paginator = this.paginator

    this._leadService.pageNo.subscribe(res=>{
      console.log(res)
      this.pageNo = res
    })

    this._leadService.pageSize.subscribe(res=>{
      console.log(res)
      this.pageSize = res
    })
    
    this._leadService.leadLists.subscribe(res=>{
      console.log(res ,'gg')
      this.totalCount = res?.totalCount
      this.listData = new MatTableDataSource<leadListModel>(res.items)
      // this.listData.paginator = this.paginator
      this.paggedData = res.items
      
    //   .listData.data.slice((Number(this.pageSize) * Number(this.pageNo)),
    // Number(this.pageSize) * Number(this.pageNo+1))
      // this.changePage()
    })
    this._leadService.getLeadList({})
  }

  ngAfterViewInit() {
    // this.changePage()
  }

  page(event){
    this._leadService.pageNo.next(event.pageIndex);
    this._leadService.pageSize.next(event.pageSize);
    this._leadService.getLeadList({})
  }

  changePage(){
    this._leadService.getLeadList({})
    this.paggedData = this.listData.data.slice((Number(this.paginator.pageSize) * Number(this.paginator.pageIndex)),
    Number(this.paginator.pageSize) * Number(this.paginator.pageIndex+1))
    console.log(this.paggedData)
  }

    getTOggler($event: any) {
        this.filterOpen = $event
    }

    headerSave($event){
      this.saveChanges = $event
      console.log($event)
    }

    switchView($event){
      console.log($event)
      if($event.source=='view'){
        this.view=$event.bool      
      }
      if($event.source=='save'){
        this.saveChanges = $event.bool       
      }

    }
}
