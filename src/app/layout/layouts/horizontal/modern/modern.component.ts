import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PristineMediaWatcherService } from '@pristine/services/media-watcher';
import {
    PristineNavigationItem,
    PristineNavigationService,
    PristineVerticalNavigationComponent
} from '@pristine/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import {navigation} from "../../../../navigation/navigation";
import {SessionManagement} from "../../../../../@pristine/process/SessionManagement";

@Component({
    selector     : 'modern-layout',
    templateUrl  : './modern.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ModernLayoutComponent implements OnInit, OnDestroy
{
    isScreenSmall: boolean;
    navigation: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _session: SessionManagement,
        private _navigationService: NavigationService,
        private _pristineMediaWatcherService: PristineMediaWatcherService,
        private _pristineNavigationService: PristineNavigationService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to navigation data
        // this._navigationService.navigation$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((navigation: Navigation) => {
        //         console.log(navigation)
        //         this.navigation = navigation;
        //     });
        this.navigation = this._session.getMenu as PristineNavigationItem;
        for(let i =0; i< this.navigation.length;i++){
            if(this.navigation[i]?.type =='collapsable'){
                this.navigation[i].type='group'
                for(let j =0; j< this.navigation[i].children.length;j++) {
                    if (this.navigation[i].children[j].type == 'item') {
                        this.navigation[i].children[j].type='basic'
                    }
                }
            }
        }
        console.log(this.navigation)
        // Subscribe to media changes
        this._pristineMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._pristineNavigationService.getComponent<PristineVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
