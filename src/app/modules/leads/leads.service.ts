import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HeaderService } from '@pristine/components/header/header.service';
import { SessionManagement } from '@pristine/process/SessionManagement';
import { WebApiHttp } from '@pristine/process/WebApiHttp.services';
import { messages } from 'app/mock-api/apps/chat/data';
import { leadListModel } from 'app/model/LeadsModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  leadLists: BehaviorSubject<any> = new BehaviorSubject<any>([]); 
  pageSize: BehaviorSubject<number> = new BehaviorSubject<any>(10)
  pageNo: BehaviorSubject<number> = new BehaviorSubject<any>(0)
  saveFile : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  loading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  selectedLead: BehaviorSubject<any> = new BehaviorSubject<any>({})
  toaster: BehaviorSubject<{type:string,message: string}> =  new BehaviorSubject<{type:string,message: string}>({type:'',message: ''})
  filters: any={}
  viewFilterOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  pageType: BehaviorSubject<'list'|'create'|'view'|'edit'> = new BehaviorSubject<'list'|'create'|'view'|'edit'> ('list')
  constructor(private _session: SessionManagement, 
              private _webAPi: WebApiHttp,
              private _header: HeaderService
    ) {

  }

  createLead(values){
    this.loading.next(true);
    this._webAPi.Post(this._webAPi.ApiURLArray.createLead, values).then(res=>{
      console.log(res.lenght,res ,res[0]?.condition, res[0]?.condition.toLowerCase()=='true')
      if( res[0]?.condition.toLowerCase()=='true'){
        this.toaster.next({type:'success', message:res[0]?.message})
        this._header.switchView.next({type:'list', value:true})
        this.pageType.next('list')
        this.getLeadList()
      }else{
        this.toaster.next({type:'error', message:res[0]?.message})
      }
    },err=>{console.log(err)}).catch(err=>{
      console.log(err)
      this.toaster.next({type:'error', message:err[0]?.message})
    }).finally(()=>{
      this.loading.next(false)
    })
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return new Promise((resolve,reject)=>{
      Promise.all([]).then((results)=>{
        resolve(results);
      },reject);
    });
  }

  getLeadList(){
    this.loading.next(true)
    delete this.filters['sorting_column']
    this.filters["sorting_column"] = Object.keys(this.filters).toString()
    this.filters["sorting_column"] =  this.filters["sorting_column"] ==''?'lead_code':this.filters["sorting_column"]
    console.log(this.filters)
    
    this._webAPi.Post(this._webAPi.ApiURLArray.getLeads+this.pageNo.value+'&pageSize='+this.pageSize.value, this.filters).then(res=>{

      this.autoScrollToTop()
      if(Number(res?.totalCount)>0){
        this.leadLists.next(res)
      }else{
        if(res?.length>0 && res[0]?.hasOwnProperty('condition')  && res[0]?.condition.toLowerCase() =='false'){
          console.log('error')
          this.toaster.next({type:'error', message:res[0]?.message})
        }
        this.leadLists.next({items:[], totalCount:0})
      }
        
      
      console.log(res,res?.length , res[0]?.hasOwnProperty('condition')  , res[0]?.condition.toLowerCase() =='false')
    },err=>{console.log(err)}).catch(err=>{
      console.log(err)
    }).finally(()=>{
      this.loading.next(false)
    })
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

    this.getLeadList()
  }

  autoScrollToTop(){
    document.getElementById('scrollTop')?.scrollTo(0,0)
  }

  getLeadDetails(details){
    this.loading.next(true)
    let json={sorting_column: "lead_code", lead_code : " = '"+ details.lead_code+"'"} 
    
    this._webAPi.Post(this._webAPi.ApiURLArray.getLeads+'0'+'&pageSize='+'1', json).then(res=>{
      console.log(res)
      if(Number(res?.totalCount)>0){
        this.selectedLead.next ({header:{
          user_name: res?.items[0]?.first_name +' '+ res?.items[0]?.last_name,
          company: res?.items[0]?.company
        }, all:res?.items[0]})
      }else{
        if(res?.length>0 && res[0]?.hasOwnProperty('condition')  && res[0]?.condition.toLowerCase() =='false'){
          console.log('error')
          this.toaster.next({type:'error', message:res[0]?.message})
        }
     
      }
      console.log(res,res?.length , res[0]?.hasOwnProperty('condition')  , res[0]?.condition.toLowerCase() =='false')
    },err=>{console.log(err)}).catch(err=>{
      console.log(err)
    }).finally(()=>{
      this.loading.next(false)
    })
    
  }

  async getLeadNotes(lead_code, flag): Promise<any>{
    return await this._webAPi.Get(this._webAPi.ApiURLArray.getLeadNotes+lead_code+'&flag='+flag)
  }

  async insertNotes(json: FormData): Promise<any|string>{

    console.log(json)
    json.forEach((e,k)=>console.log(k +':' +e))
    return await this._webAPi.PostFormData(this._webAPi.ApiURLArray.insertUpdateNote,json)

  }

}
