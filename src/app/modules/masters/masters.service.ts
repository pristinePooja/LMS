import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HeaderService } from '@pristine/components/header/header.service';
import { SessionManagement } from '@pristine/process/SessionManagement';
import { WebApiHttp } from '@pristine/process/WebApiHttp.services';
// import { ComponentsService } from 'app/components/components.service';
import { countryListModel } from 'app/model/mstcountryModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MastersService {

  pageSize: BehaviorSubject<number> = new BehaviorSubject<any>(10)
  pageNo: BehaviorSubject<number> = new BehaviorSubject<any>(0)
  saveFile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  toaster: BehaviorSubject<{ type: string, message: string }> = new BehaviorSubject<{ type: string, message: string }>({ type: '', message: '' })
  filters: any = {};
  viewFilterOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  countryList:Array<countryListModel>=[]
  pageType: BehaviorSubject<'list' | 'create' | 'view' | 'edit'> = new BehaviorSubject<'list' | 'create' | 'view' | 'edit'>('list')

  constructor(private _session: SessionManagement,
    private _webAPi: WebApiHttp,
    private _dialog: MatDialog,
    // private _commonComponents: ComponentsService,
    private _header: HeaderService
  ) { }

  countryMstList(){
    this.loading.next(true)
    return this.countryList
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([]).then((results) => {
        resolve(results);
      }, reject);
    });
  }

  filterFormater(params){
    this.filters ={};
    this.pageNo.next(0)
    for(let i=0; i< params.length;i++){
      if(params[i].selected_filter=="is"){
        console.log("is")
        this.filters[params[i].key] =` = '${params[i].value}'`
      }
      else if(params[i].selected_filter=="isn't"){
        console.log("isn't")
        this.filters[params[i].key] =` not ='${params[i].value}'`
      }
      else if(params[i].selected_filter=="contains"){
        this.filters[params[i].key] =` like '%${params[i].value}%'`
      }
      else if(params[i].selected_filter=="dosen't contain"){
        this.filters[params[i].key] =` not like "%${params[i].value}%'`
      }
      else if(params[i].selected_filter=="starts with"){
        this.filters[params[i].key] =` like '${params[i].value}%'`
      }
      else if(params[i].selected_filter=="ends with"){
        this.filters[params[i].key] =` like "%${params[i].value}'`
      }
      else if(params[i].selected_filter=="is empty"){
        this.filters[params[i].key] =` is null`
      }
      else if(params[i].selected_filter=="is not empty"){
        this.filters[params[i].key] =`is not null`
      }
      else if(params[i].selected_filter=="="){
        this.filters[params[i].key] =` = ${params[i].value}`
      }
      else if(params[i].selected_filter=="!="){
        this.filters[params[i].key] =` != ${params[i].value}`
      }
      else if(params[i].selected_filter=="<"){
        this.filters[params[i].key] =` < ${params[i].value}`
      }
      else if(params[i].selected_filter=="<="){
        this.filters[params[i].key] =` <= ${params[i].value}`
      }
      else if(params[i].selected_filter==">"){
        this.filters[params[i].key] =` > ${params[i].value}`
      }
      else if(params[i].selected_filter==">="){
        this.filters[params[i].key] =` >= ${params[i].value}`
      }
      else if(params[i].selected_filter=="between"){
        this.filters[params[i].key] =` between ${params[i].value} and ${params[i].val2}`
      }
      else if(params[i].selected_filter=="not between"){
        this.filters[params[i].key] =` not between ${params[i].value} and ${params[i].val2}`
      }
    }
  }


}
