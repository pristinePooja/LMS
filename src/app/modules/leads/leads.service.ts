import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionManagement } from '@pristine/process/SessionManagement';
import { WebApiHttp } from '@pristine/process/WebApiHttp.services';
import { leadListModel } from 'app/model/LeadsModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  leadLists: BehaviorSubject<any> = new BehaviorSubject<any>([]); 
  pageSize: BehaviorSubject<number> = new BehaviorSubject<any>(10)
  pageNo: BehaviorSubject<number> = new BehaviorSubject<any>(0)

  constructor(private _session: SessionManagement, 
              private _webAPi: WebApiHttp,
    ) {
    // this.leadLists.next([
    //   {
    //     lead_owner:'User',
    //     company: 'pristine Isdkf df',
    //     f_name: 'Anonyms',
    //     l_name:'Hsjieb',
    //     title:'Tech Head',
    //     email: 'abcdefg23@kjdfd.com',
    //     phone:'1234567890',
    //     fax:'',
    //     mobile_no: '8949394747',
    //     website:'www.jfgjfnf.com',
        
    //   }
    // ])
  }

  createLead(values){
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
      created_by: ("string").toString()
    }
    console.log(values)
    this._webAPi.Post(this._webAPi.ApiURLArray.createLead, json).then(res=>{
      if(res?.condition.toLowerCase()=='true'){

      }
      console.log(res)
    },err=>{console.log(err)}).catch(err=>{
      console.log(err)
    }).finally(()=>{})
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

  getLeadList(filter){
    filter["sorting_column"] = Object.keys(filter).toString()
    filter["sorting_column"] =  filter["sorting_column"] ==''?'lead_code':filter["sorting_column"]
    console.log(filter)
    
    this._webAPi.Post(this._webAPi.ApiURLArray.getLeads+this.pageNo.value+'&pageSize='+this.pageSize.value, filter).then(res=>{
      console.log(res, res?.totalCount>0)
      if(Number(res?.totalCount)>0){
        this.leadLists.next(res)
        console.log('meow', res.items, res.totalCount)
      }
      console.log(res)
    },err=>{console.log(err)}).catch(err=>{
      console.log(err)
    }).finally(()=>{})
  }

  public vals: Array<leadListModel> = []

}
