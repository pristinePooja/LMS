import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  leadLists: BehaviorSubject<any> = new BehaviorSubject<any>(null); 
  constructor() {
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
    let json={
      "lead_owner": "string",
      "company": "string",
      "first_name": "string",
      "last_name": "string",
      "title": "string",
      "email": "string",
      "fax": "string",
      "phone": "string",
      "mobile": "string",
      "website": "string",
      "lead_source": "string",
      "lead_status": "string",
      "industry": "string",
      "no_of_employees": 0,
      "annual_revenue": 0,
      "rating": 0,
      "email_opt_out": 0,
      "skype_id": "string",
      "secondary_email": "string",
      "twitter": "string",
      "street": "string",
      "city": "string",
      "state": "string",
      "zipcode": "string",
      "country": "string",
      "description": "string",
      "created_by": "string"
    }
  }

  
}
