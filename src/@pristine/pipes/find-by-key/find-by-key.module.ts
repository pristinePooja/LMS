import { NgModule } from '@angular/core';
import { PristineFindByKeyPipe } from '@pristine/pipes/find-by-key/find-by-key.pipe';

@NgModule({
    declarations: [
        PristineFindByKeyPipe
    ],
    exports     : [
        PristineFindByKeyPipe
    ]
})
export class PristineFindByKeyPipeModule
{
}
