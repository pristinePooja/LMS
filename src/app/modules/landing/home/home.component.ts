
import { Component, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'app/shared/AuthenticationService.service';
import { GoogleApiService } from 'ng-gapi';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent
{
    /**
     * Constructor
     */
    aa :any=''
    constructor(
        private _authService: AuthenticationService,
        private gapiService: GoogleApiService)
    {
        
    //     this.gapiService.onLoad().subscribe(
    //         (res) => { console.log("res ->", res)
    //     if(res){
    //         gapi.client
    //         gapi.auth.authorize({
    //             client_id:"",
    //             immediate:false,
    //             scope:["https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/calendar.readonly"].join(" ")
    //         }, (result)=>{console.log(res)})
    //     } },//true
    //    (err) => { console.log("err ->", err) }
    //     );
    }

    public isLoggedIn(): boolean {
        return this._authService.isUserSignedIn();
      }
    
      public signIn() {
        this._authService.signIn();
      }

    hitGoogle(){
       this._authService.initGoogleOAuth().then(res=>console.log(res))
    }

    createMeetLink(){
    

    }
}
