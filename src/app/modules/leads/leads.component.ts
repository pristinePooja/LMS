import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LeadsComponent implements OnInit {
    filterOpen:boolean = true
    headerData: any={type:'filter',active:this.filterOpen, icon:'filter',url:''};
  constructor() { }

  ngOnInit(): void {
  }

    getTOggler($event: any) {
        console.log($event)
        this.filterOpen = $event
    }
}
