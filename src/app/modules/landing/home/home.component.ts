
import { Component, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'app/shared/AuthenticationService.service';
// import { GoogleApiService } from 'ng-gapi';

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
        // private gapiService: GoogleApiService
        )
    {
    }
    public isLoggedIn(): boolean {
      return true
        // return this._authService.isUserSignedIn();
      }
    
      public signIn() {
        // this._authService.signIn();
      }

    hitGoogle(){
      //  this._authService.initGoogleOAuth().then(res=>console.log(res))
    }

    createMeetLink(){
    

    }
}
