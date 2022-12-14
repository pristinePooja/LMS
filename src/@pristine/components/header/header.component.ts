import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {pristineAnimations} from "../../animations";
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
    animations: pristineAnimations
})
export class HeaderComponent implements OnInit {

  constructor(private _headerService: HeaderService) { }
  @Input() pageName: any
  @Input() data?: any
  @Input() filterIcon: {type:string,active:boolean, icon:string,filterOptions?: Array<any>, url?:string, class?: string }
  @Output() filterViewToggle : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() SaveChanges : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ViewPage : EventEmitter<{"bool":boolean ,source:string}> = new EventEmitter<{"bool":boolean ,source:string}>();

  create: boolean = false
  commomClassesfilter= 'flex text-zinc-700 items-end bg-white rounded-md px-2 py-1 hover:border-zinc-700'
  classes= {
      active: this.commomClassesfilter + ' '+'shadow-inner shadow-zinc-600',
      unactive:this.commomClassesfilter + ' '+'shadow-none border border-solid border-zinc-400'
  }
    selectedFilterOption: any;
    menuState: 'expanded'|'collapsed'='collapsed';

  ngOnInit(): void {

     if(this.filterIcon.type=='back'){
         this.filterIcon.icon='feather:arrow-left'
     }else if(this.filterIcon.type=='filter'){
         this.filterIcon.icon='feather:filter'
     }
    //  this.filterIcon.filterOptions = ['All','None', 'Some value 1', 'Some value 2']
      this.selectedFilterOption = this.filterIcon.filterOptions[0]

      this._headerService.switchView.subscribe(res=>{
        // if(res)
          this.toggleCreate(res?.value,res?.type)
      })
    }

    toggleFilter() {
      this.filterIcon.active = !this.filterIcon.active
        console.log(this.filterIcon.active)
        this.filterViewToggle.emit(this.filterIcon.active)
    }

    save(){
      this.SaveChanges.emit(true)
    }

    previousLoaction() {
      if(this.filterIcon.url==''){
        window.history.back()
      }else if(this.filterIcon.url=='showList'){
        let json = {bool:true,source:'list'}
        this.ViewPage.emit(json)
      }
    }

    toggleCreate(openView, source){
      console.log(openView, source)
      if(source == 'list' ){
      this.create= !this.create
    }if(source=='edit' ){
      this.create=openView
    }
    console.log(this.create)
    let json = {bool:openView,source:source}
      this.ViewPage.emit(json)
    }

}
