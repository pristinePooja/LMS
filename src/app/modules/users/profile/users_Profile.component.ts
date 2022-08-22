import { Component, OnInit } from '@angular/core';
import { SessionManagement } from '@pristine/process/SessionManagement';
import { expandCollapse } from '@pristine/animations/expand-collapse'
@Component({
  selector: 'users_profile',
  templateUrl: './users_Profile.component.html',
  styleUrls: ['./users_Profile.component.scss'],
  animations:[
    expandCollapse
  ]
})
export class UsersProfileComponent implements OnInit {

  constructor(private _session:SessionManagement) {   }
  userDetails: any ;
  showDets: boolean = false;
  ngOnInit(): void {
    this.userDetails= {name:this._session.getName,
     email:this._session.getEmail,
     location:this._session.getLocationName,
     role:this._session.getRoleName,
     img:this._session.getUserImg
    }
    console.log(this.userDetails)
  }
}
