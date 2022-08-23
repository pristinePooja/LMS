import { Injectable } from '@angular/core';
import { SessionManagement } from '@pristine/process/SessionManagement';
import { WebApiHttp } from '@pristine/process/WebApiHttp.services';
import { leadListModel } from 'app/model/LeadsModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  leadLists: BehaviorSubject<any> = new BehaviorSubject<any>(null); 
  constructor(private _session: SessionManagement, 
              private _webAPi: WebApiHttp,
    ) {
    this.leadLists.next([
      {
        lead_owner:'User',
        company: 'pristine Isdkf df',
        f_name: 'Anonyms',
        l_name:'Hsjieb',
        title:'Tech Head',
        email: 'abcdefg23@kjdfd.com',
        phone:'1234567890',
        fax:'',
        mobile_no: '8949394747',
        website:'www.jfgjfnf.com',
        
      }
    ])
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
      console.log(res)
    },err=>{console.log(err)}).catch(err=>{
      console.log(err)
    }).finally(()=>{})
  }

  
  public vals: Array<leadListModel> = [
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 0,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    },
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 3,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    },
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 5,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    },
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 1,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    },
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 9,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    },
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 4,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    },
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 6,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    },
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 4,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    },
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 8,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    },
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 3,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    },
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 7,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    },
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 8,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    },
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 9,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    },
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 6,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    },
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 5,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    },
    {
      "lead_owner": "Manish Chauhan",
      "company": "Rangoni Of Florence",
      "first_name": "Christopher",
      "last_name": "Maclead",
      "title": "VP Accounting",
      "email": "christopher-maclead@gmail.com",
      "fax": "",
      "phone": "555-555-5555",
      "mobile": "555-555-5555",
      "website": "http://www.chapmanrosseesq.com",
      "lead_source": "Online Store",
      "lead_status": "Attempted to Contact",
      "industry": "Storage Equipment",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 2,
      "email_opt_out": 0,
      "skype_id": "felix-hirpara",
      "secondary_email": "string",
      "twitter": "felixhirpara_sample",
      "street": "3 Mcauley Dr",
      "city": "Ashland",
      "state": "OH",
      "zipcode": "44805",
      "country": "United States",
      "description": "",
      "created_by": "string"
    }
  ]

}
