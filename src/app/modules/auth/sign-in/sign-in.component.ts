import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pristineAnimations } from '@pristine/animations';
import { PristineAlertType } from '@pristine/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import {WebApiHttp} from "../../../../@pristine/process/WebApiHttp.services";
import {SessionManagement} from "../../../../@pristine/process/SessionManagement";
import {ValidateResponse} from "../../../../@pristine/process/ValidateResponse";
import {PristineNavigationService} from "../../../../@pristine/components/navigation";
import {SignalR} from "../../../../@pristine/process/SignalR";
import {receiverData} from "../../../model/SignalRModel";
import {navigation} from "../../../navigation/navigation";

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : pristineAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: PristineAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _pristineNavigationService: PristineNavigationService,
        private _validateResponse: ValidateResponse,
        private _sessionManageMent: SessionManagement,
        private _signalR: SignalR,
        private _webApiHttp: WebApiHttp
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email     : ['', [Validators.required, Validators.email]],
            password  : ['', Validators.required],
            rememberMe: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // login json
        let json =
            {
                "email":this.signInForm.get('email').value,
                "password":this.signInForm.get('password').value
            }

        // Sign in
        this._webApiHttp.Post(this._webApiHttp.ApiURLArray.login, json).then(result=>{
            if (this._validateResponse.checkArray(result)) {
                if (this._validateResponse.checkArrayResponseCondition(result) == true) {
                    // let temp: PristineNavigation[] = navigation;
                    navigation[0].children = result[0].menu;
                    //temp = navigationProject;
                    // set sesion for this website;
                    this._sessionManageMent.setEmailSession(this.signInForm.get('email').value);
                    this._sessionManageMent.setRoleSession(result[0].roleId);
                    this._sessionManageMent.setRoleNameSession(result[0].role_name);
                    this._sessionManageMent.setMenuSession(result[0].menu);
                    // this._sessionManageMent.setMenuSession(navigation);
                    this._sessionManageMent.setNameSession(result[0].name);
                    this._sessionManageMent.setLocationId(result[0].locationId);
                    this._sessionManageMent.setAuthToken(result[0].jwt_token);
                    // this._authService.accessToken = this._sessionManageMent.getAuthToken
                    this._sessionManageMent.setLocationNameSession((result[0].location_name == null || result == undefined) ? 'Wrong' : result[0].location_name);
                    // end Session
                    // this._pristineNavigationService.registerComponent('main', navigation);
                    // this._pristineNavigationService.setCurrentNavigation('main');
                    this._signalR.startConnection(this._sessionManageMent.getEmail, this._webApiHttp.globalurl + this._webApiHttp.ApiURLArray.signalRNotification);
                    receiverData.subscribe(result => {
                        try {
                            if (result.action == 'Logout') {
                                this._signalR.stopSignalRConnection();
                                localStorage.clear();
                                //this._router.navigateByUrl('/pages/auth/login-2');
                                window.location.reload();
                            }
                        } catch (e) {

                        }
                    });
                    this._router.navigateByUrl('/dashboard/posDashBoard');

                } else {
                    if(result[0].message=="You do not have permision to login from web."){
                        // window.open('PristinePOSAlert:PristinePOS',"_blank");
                    }
                    else{
                        // Re-enable the form
                        this.signInForm.enable();

                        // Reset the form
                        this.signInNgForm.resetForm();

                        // Set the alert
                        this.alert = {
                            type   : 'error',
                            message: result[0]?.message
                        };

                        // Show the alert
                        this.showAlert = true;
                    }
                    // this._toastr.error('Error', result[0].message);
                    // this._toastr.onError('Error', result.message);
                    // this.loading = false;
                }
             }else{


            }
        }).catch(err=>{})
        // this._authService.signIn(this.signInForm.value)
        //     .subscribe(
        //         () => {
        //
        //             // Set the redirect url.
        //             // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
        //             // to the correct page after a successful sign in. This way, that url can be set via
        //             // routing file and we don't have to touch here.
        //             const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
        //
        //             // Navigate to the redirect url
        //             this._router.navigateByUrl(redirectURL);
        //
        //         },
        //         (response) => {
        //
        //             // Re-enable the form
        //             this.signInForm.enable();
        //
        //             // Reset the form
        //             this.signInNgForm.resetForm();
        //
        //             // Set the alert
        //             this.alert = {
        //                 type   : 'error',
        //                 message: 'Wrong email or password'
        //             };
        //
        //             // Show the alert
        //             this.showAlert = true;
        //         }
        //     );
    }
}
