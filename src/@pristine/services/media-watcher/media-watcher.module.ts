import { NgModule } from '@angular/core';
import { PristineMediaWatcherService } from '@pristine/services/media-watcher/media-watcher.service';

@NgModule({
    providers: [
        PristineMediaWatcherService
    ]
})
export class PristineMediaWatcherModule
{
    /**
     * Constructor
     */
    constructor(private _pristineMediaWatcherService: PristineMediaWatcherService)
    {
    }
}
