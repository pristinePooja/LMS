
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { WebApiHttp } from '@pristine/process/WebApiHttp.services';
import { Observable, Subject } from 'rxjs';
import * as _ from "lodash";
import { GoogleApiService, GoogleAuthService } from 'ng-gapi';
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
@Injectable({
  providedIn: 'root'
})

 
export class AuthenticationService  {
  public static readonly SESSION_STORAGE_KEY: string = "accessToken";
  private user: GoogleUser = undefined;

    constructor(private http: HttpClient,
                private _webAPiHttp: WebApiHttp,
                private ngZone: NgZone,
                private googleAuthService: GoogleAuthService,) { }

                public setUser(user: GoogleUser): void {
                  this.user = user;
              }

              async initGoogleOAuth() {
                return await gapi.load('auth2', async () => {
                   gapi.auth2.init({
                    client_id: "830495043822-0iu6clc0p1cbsgrm0557feo0fnlnnh01.apps.googleusercontent.com",
                    fetch_basic_profile: true,
                    scope: 'profile email'
                });
                })
            }
          
              public getCurrentUser(): GoogleUser {
                  return this.user;
              }
          
              public getToken(): string {
                console.log(AuthenticationService.SESSION_STORAGE_KEY)
                  let token: string = sessionStorage.getItem(AuthenticationService.SESSION_STORAGE_KEY);
                  if (!token) {
                      throw new Error("no token set , authentication required");
                  }
                  return sessionStorage.getItem(AuthenticationService.SESSION_STORAGE_KEY);
              }
          
              public signIn() {
                try{
                  this.googleAuthService.getAuth().subscribe((auth) => {
                      console.log("auth....", auth);
                      auth.signIn()
                        .then(
                         (res) => {
                           this.ngZone.run(() => {
                             this.user = res;
                             sessionStorage.setItem(
                               "CalendarAccessToken", res.getAuthResponse().access_token
                              );
                             console.log(res.getAuthResponse().access_token)
                              //  .subscribe(
                              //    (res) => { console.log(res) },
                              //    (err) => { console.log(err) }
                              //  );
                           });
                         },
                         (err) => this.signInErrorHandler(err));
                   },
                   (err) => { console.log("err....", err) }
                      // auth.signIn().then(res => this.signInSuccessHandler(res), err => this.signInErrorHandler(err));
                  // }
                  );}catch(err){
                    console.log(err)
                  }
              }
          
              //TODO: Rework
              public signOut(): void {
                  this.googleAuthService.getAuth().subscribe((auth) => {
                      try {
                          auth.signOut();
                      } catch (e) {
                          console.error(e);
                      }
                      sessionStorage.removeItem(AuthenticationService.SESSION_STORAGE_KEY)
                  });
              }
          
              public isUserSignedIn(): boolean {
                  return !_.isEmpty(sessionStorage.getItem(AuthenticationService.SESSION_STORAGE_KEY));
              }
          
              private signInSuccessHandler(res: GoogleUser) {
                  this.ngZone.run(() => {
                      this.user = res;
                      sessionStorage.setItem(
                          AuthenticationService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
                      );
                  });
              }
          
              private signInErrorHandler(err) {
                  console.warn(err);
              }

//     attendeesEmails = [
//       { 'email': 'vaishali.singh@pristinebs.co.in' },
//       { 'email': 'arjun.singh@pristinebs.co.in' }
//       ];
//     event = {
//       summary: 'Meet Tesing',
//       location: 'Virtual / Google Meet',
//       description: 'Velle baithe baithe kya kroge',
//       start: {
//         dateTime: '2022-09-16T014:00:00-07:00',
//         timeZone: 'America/Los_Angeles',
//       },
//       end: {
//         dateTime: '2022-09-18T09:30:00-07:00',
//         timeZone: 'Asia/Kolkata',
//       },
//       attendees: this.attendeesEmails,
//       reminders: {
//         useDefault: false,
//         overrides: [
//           { method: 'email', 'minutes': 24 * 60 },
//           { method: 'popup', 'minutes': 10 },
//         ],
//       },
//       conferenceData: {
//         createRequest: {
//           conferenceSolutionKey: {
//             type: 'hangoutsMeet'
//           },
//           requestId: 'test_meeting'
//         }
//       },
//     };


//   // console.log(`📅 Calendar event created: ${summary} at ${location}, from ${start.dateTime} to ${end.dateTime}, attendees:\n${attendees.map(person => `🧍 ${person.email}`).join('\n')} \n 💻 Join conference call link: ${uri}`);

  resolve(
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return new Promise((resolve,reject)=>{
      Promise.all([]).then((results)=>{
        resolve(results);
      },reject);
    });
  }

}
