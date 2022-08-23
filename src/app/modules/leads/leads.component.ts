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
  constructor(private _leadService: LeadsService) { }

  ngOnInit(): void {
    this.listData = new MatTableDataSource<leadListModel>(this._leadService.vals)
    this.listData.paginator = this.paginator
  }

  ngAfterViewInit() {
    this.changePage()
  }

  changePage(){
    this.paggedData = this.listData.data.slice((Number(this.paginator.pageSize) * Number(this.paginator.pageIndex)),
    Number(this.paginator.pageSize) * Number(this.paginator.pageIndex+1))
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
