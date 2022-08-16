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

  
}
