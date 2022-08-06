import {EncriptDecript} from "./EncriptDecript";
import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import * as Rx from "rxjs";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionManagement {

  static sessionLogout: boolean = false;
  currentUser$ = new Rx.ReplaySubject(2, 100);
  public CurrentLocation: BehaviorSubject<any> = new BehaviorSubject<any>(this.getLocationId)
  constructor(private _encriptDecript: EncriptDecript, private _router: Router, private activateroute: ActivatedRoute) {
    // subscriber 1
    this.currentUser$.subscribe((data) => {
      // console.log('Subscriber A:', data);
      if (data == '') {
        if (SessionManagement.sessionLogout == false) {
          SessionManagement.sessionLogout = true;
          if (!window.location.href.includes('/sign-in'))
            this._router.navigateByUrl('/sign-in');
        } else {
          setTimeout(() => {
              SessionManagement.sessionLogout = false;
            },
            60000);
        }
      }
    });
// Behavior Subject
  }

  get getLocationName(): string {
    try {
      let LocationName: string = this._encriptDecript.decrypt(localStorage.getItem('locName').toString());
      if (LocationName != null && LocationName != '' && LocationName != undefined && LocationName != '  ')
        return LocationName;
      else
        return '';
    } catch (e) {
      return '';
    }
  }

  get getRoleId(): string {
    try {
      let roleid: string = this._encriptDecript.decrypt(localStorage.getItem('Role').toString());
      if (roleid != null && roleid != '' && roleid != undefined && roleid != '  ')
        return roleid;
      else
        return '';
    } catch (e) {
      return '';
    }
  }

  get getRoleName(): string {
    try {
      let roleid: string = this._encriptDecript.decrypt(localStorage.getItem('RoleName').toString());
      if (roleid != null && roleid != '' && roleid != undefined && roleid != '  ')
        return roleid;
      else
        return '';
    } catch (e) {
      return '';
    }
  }

  get getEmail(): string {
    try {
      let email_id: string = this._encriptDecript.decrypt(localStorage.getItem('emailId').toString());
      if (email_id != null && email_id != '' && email_id != undefined && email_id != '  ') {
        this.currentUser$.next(email_id);
        return email_id;
      } else {
        this.currentUser$.next('');
        return '';
      }
    } catch (e) {
      this.currentUser$.next('');
      return '';
    }
  }

  get getName(): string {
    try {
      let name: string = this._encriptDecript.decrypt(localStorage.getItem('name').toString());
      if (name != null && name != '' && name != undefined && name != '  ')
        return name;
      else
        return '';
    } catch (e) {
      return '';
    }
  }
  get getUserImg(): string {
    try {
      let name: string = this._encriptDecript.decrypt(localStorage.getItem('img').toString());
      if (name != null && name != '' && name != undefined && name != '  ')
        return name;
      else
        return '';
    } catch (e) {
      return '';
    }
  }

  get getLocationId(): string {
    try {
      let LocationId: string = this._encriptDecript.decrypt(localStorage.getItem('locId').toString());
      if (LocationId != null && LocationId != '' && LocationId != undefined && LocationId != '  ')
        return LocationId;
      else
        return '';
    } catch (e) {
      return '';
    }
  }

  get getMenu(): any {
    try {
      return JSON.parse(this._encriptDecript.decrypt(localStorage.getItem('menu').toString()));
    } catch (e) {
      return undefined;
    }
  }

    get getAuthToken(): any {
        try {
            let value: string = this._encriptDecript.decrypt(localStorage.getItem('Auth').toString());
            if (value != null && value != '' && value != undefined && value != '  ')
                return value;
            else
                return '';
        } catch (e) {
            return '';
        }
    }


  setNameSession(name: string) {
    localStorage.setItem('name', this._encriptDecript.encrypt(name));
  }
  setUserImage(name: string) {
    localStorage.setItem('img', this._encriptDecript.encrypt(name));
  }
  setLocationNameSession(locationname: string) {
    localStorage.setItem('locName', this._encriptDecript.encrypt(locationname));
  }
  setLocationId(location_id: string) {
    localStorage.setItem('locId', this._encriptDecript.encrypt(location_id));
    this.CurrentLocation.next(location_id)
  }
  setAuthToken(pick: string) {
    localStorage.setItem('Auth', this._encriptDecript.encrypt(pick));
  }
  setMenuSession(menu: any) {
    localStorage.setItem('menu', this._encriptDecript.encrypt(JSON.stringify(menu).toString()));
  }
  setEmailSession(email_Id: string) {
    // this.setCookie('emailId', this._encriptDecript.encrypt(email_Id), 1);
    localStorage.setItem('emailId', this._encriptDecript.encrypt(email_Id));
  }
  setRoleSession(roleId: string) {
    localStorage.setItem('Role', this._encriptDecript.encrypt(roleId));
  }
  setRoleNameSession(roleId: string) {
    localStorage.setItem('RoleName', this._encriptDecript.encrypt(roleId));
  }



  // cookie management

  // private setCookie(name: string, value: string, expireDays: number, path: string = '') {
  //     let d: Date = new Date();
  //     d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
  //     let expires: string = `expires=${d.toUTCString()}`;
  //     let cpath: string = path ? `; path=${path}` : '';
  //     document.cookie = `${name}=${value}; ${expires}${cpath}`;
  // }
  //
  // private getCookie(name: string) {
  //     let ca: Array<string> = document.cookie.split(';');
  //     let caLen: number = ca.length;
  //     let cookieName = `${name}=`;
  //     let c: string;
  //
  //     for (let i: number = 0; i < caLen; i += 1) {
  //         c = ca[i].replace(/^\s+/g, '');
  //         if (c.indexOf(cookieName) == 0) {
  //             return c.substring(cookieName.length, c.length);
  //         }
  //     }
  //     return '';
  // }
  //
  // private deleteCookie(name) {
  //     this.setCookie(name, '', -1);
  // }

  // end cookie

}
