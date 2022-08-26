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
  pageType: BehaviorSubject<'list'|'create'|'view'> = new BehaviorSubject<'list'|'create'|'view'> ('list')
  constructor(private _session: SessionManagement, 
              private _webAPi: WebApiHttp,
              private _header: HeaderService
    ) {

  }

  createLead(values){
    this.loading.next(true);
    let json : leadListModel={
      lead_owner: (values?.lead_owner).toString(),
      company: (values?.company).toString(),
      first_name: (values?.first_name).toString(),
      last_name: (values?.last_name).toString(),
      title: (values?.title).toString(),
      email: (values?.email).toString(),
      fax: (values?.fax).toString(),
      phone: (values?.phone).toString(),
      mobile: (values?.mobile).toString(),
      website: (values?.website).toString(),
      lead_source: (values?.lead_source).toString(),
      lead_status: (values?.lead_status).toString(),
      industry: (values?.industry).toString(),
      no_of_employees: Number(values?.no_of_employees),
      annual_revenue: Number(values?.annual_revenue),
      rating: Number(values?.rating),
      email_opt_out: Number(values?.email_opt_out)?1:0,
      skype_id: (values?.skype_id).toString(),
      secondary_email: (values?.secondary_email).toString(),
      twitter: (values?.twitter).toString(),
      street: (values?.street).toString(),
      city: (values?.city).toString(),
      state: (values?.state).toString(),
      zipcode: (values?.zipcode).toString(),
      country: (values?.country).toString(),
      description: (values?.description).toString(),
      created_by: (this._session.getEmail).toString()
    }
    this._webAPi.Post(this._webAPi.ApiURLArray.createLead, json).then(res=>{
      console.log(res.lenght,res ,res[0]?.condition, res[0]?.condition.toLowerCase()=='true')
      if( res[0]?.condition.toLowerCase()=='true'){
        this.toaster.next({type:'success', message:res[0]?.message})
        this._header.switchView.next(true)
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


  getLeadDetails(details){
    this.selectedLead.next ({
      user_name: details?.first_name +' '+ details?.last_name,
      company: details?.company
    })
  }

}
