import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
// import * as data from '../../assets/static.json';
import {SessionManagement} from "./SessionManagement";
import {SignalR} from "./SignalR";

@Injectable({
  providedIn: 'root'
})

export class WebApiHttp {


  public globalurl: string = 'https://dev.pristinefulfil.com' ;
  // public globalurl: string = data.url ;

  public ApiURLArray: any = {

    // User URL Start
    login: '/api/User/Login',
    Logout: '/api/User/Logout',
    createUser: '/api/User/CreateUser',
    roleProcess: '/api/Role/RoleProcess',
    signalRNotification: '/Notification',
    notificationData: '/api/User/NotificationListData',

    LoginWindowsByToken: '/api/User/LoginWindowsByToken',
    createLead: '/api/Lead/LeadInsert'
  };


  constructor(private httpClient: HttpClient,
              private sessionManageMent:SessionManagement,
              private _signalR: SignalR,
  ) {

  }

  //
  // get getHTTPHeader(): any {
  //   return {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  // }

  get getHTTPHeader(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':this.sessionManageMent.getAuthToken
      })
    };
  }
  // getHTTPHeaderAuth(token: string): any {
  //   return {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + token
  //     })
  //   };
  // }

  // post data to server
  async Post(path: string, jsondata: any): Promise<any> {
    try {
      path = this.globalurl + path;
      var headers = this.getHTTPHeader;
      return await new Promise<any>((resolve, reject) => {
        this.httpClient.post<any>(path, JSON.stringify(jsondata), headers).toPromise()
          .then(result => resolve(result), error => {
            if(error.status==401 && error.error.condition.toLowerCase()=="false"){
              this._signalR.stopSignalRConnection();
              localStorage.clear();
            }
            reject({
              condition: 'False',
              message: error.message
            })
          }).catch(err => reject({condition: 'False', message: err.message}));
      });

    } catch (e) {
      return new Promise<any>((resolve) => {
        resolve({condition: 'False', message: e.message})
      });
    }
  }

  // get data to the server
  async Get(path: string): Promise<any> {
    try {
      path = this.globalurl + path;
      var headers = this.getHTTPHeader;
      return await new Promise<any>((resolve, reject) => {
        this.httpClient.get<any>(path, headers).toPromise()
          .then(result => resolve(result), error => {
            if(error.status==401 && error.error.condition.toLowerCase()=="false"){
              this._signalR.stopSignalRConnection();
              localStorage.clear();
            }
            reject({
              condition: 'False',
              message: error.message
            })
          }).catch(err => reject({condition: 'False', message: err.message}));
      });
    } catch (e) {
      return new Promise<any>((resolve) => {
        resolve({condition: 'False', message: e.message})
      });
    }
  }


  getImageSrc(url: string) {
    try {
      if (url.includes('imageNotFound.png')) {
        return url;
      } else {
        return this.globalurl + '/' + url;
      }
    } catch (e) {
      return '';
    }
  }

  // For formdata
  async PostFormData(path: string, formdata: any): Promise<any> {
    try {
      path = this.globalurl + path;
      return await new Promise<any>((resolve, reject) => {
        this.httpClient.post<any>(path, formdata).toPromise()
          .then(result => resolve(result), error => reject({
            condition: 'false',
            message: error.message
          })).catch(error => reject({
          condition: 'false',
          message: error.message
        }))
      })

    } catch (e) {
      return new Promise<any>((resolve) => {
        resolve({condition: 'false', message: e.message})
      })
    }
  }

  // post data to server and get two type of response
  Post_Data_GetFile(path: string, jsondata: any) {
    path = this.globalurl + path;
    const request = new HttpRequest('POST', path, jsondata, {
      responseType: 'blob',
      reportProgress: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization',this.sessionManageMent.getAuthToken)
    });
    return this.httpClient.request(request);
  }

  Get_Data_With_DownloadStatus_GetFile(path: string) {
    path = this.globalurl + path;
    const request = new HttpRequest('GET', path, {
      responseType: 'blob',
      reportProgress: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization',this.sessionManageMent.getAuthToken)
    });
    return this.httpClient.request(request);
  }

  blobToString(b) {
    var urldata, x;
    urldata = URL.createObjectURL(b);
    x = new XMLHttpRequest();
    x.open('GET', urldata, false); // although sync, you're not fetching over internet
    x.send();
    URL.revokeObjectURL(urldata);
    return x.responseText;
  }
}
