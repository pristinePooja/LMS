import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LeadsListComponent implements OnInit {

  constructor() { }
  view: string = 'list';
  @Input() height: any ='';
  filterArray: Array<any>=[50,100,200,'a200',600,50,900,200,100]
  ngOnInit(): void {
  
  }

}
