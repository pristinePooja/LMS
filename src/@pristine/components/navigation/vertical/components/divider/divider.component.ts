import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PristineVerticalNavigationComponent } from '@pristine/components/navigation/vertical/vertical.component';
import { PristineNavigationService } from '@pristine/components/navigation/navigation.service';
import { PristineNavigationItem } from '@pristine/components/navigation/navigation.types';

@Component({
    selector       : 'pristine-vertical-navigation-divider-item',
    templateUrl    : './divider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PristineVerticalNavigationDividerItemComponent implements OnInit, OnDestroy
{
    @Input() item: PristineNavigationItem;
    @Input() name: string;

    private _pristineVerticalNavigationComponent: PristineVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _pristineNavigationService: PristineNavigationService
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
        // Get the parent navigation component
        this._pristineVerticalNavigationComponent = this._pristineNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._pristineVerticalNavigationComponent.onRefreshed.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {

            // Mark for check
            this._changeDetectorRef.markForCheck();
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
}
