import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MatDrawerContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LeadsComponent implements OnInit {
    filterOpen:boolean = true;
    @ViewChild('drawer', {static: true}) drawer: ElementRef<any> 
    getHeight: string =  'max-h-[200px]'
    headerData: any={type:'filter',active:this.filterOpen, icon:'filter',url:''};
  constructor() { }

  ngOnInit(): void {
    console.log(this.getHeight)
    console.log(this.drawer)
  }


    getTOggler($event: any) {
        console.log($event)
        this.filterOpen = $event
    }
}
