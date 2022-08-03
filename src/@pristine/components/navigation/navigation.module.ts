import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PristineScrollbarModule } from '@pristine/directives/scrollbar/public-api';
import { PristineHorizontalNavigationBasicItemComponent } from '@pristine/components/navigation/horizontal/components/basic/basic.component';
import { PristineHorizontalNavigationBranchItemComponent } from '@pristine/components/navigation/horizontal/components/branch/branch.component';
import { PristineHorizontalNavigationDividerItemComponent } from '@pristine/components/navigation/horizontal/components/divider/divider.component';
import { PristineHorizontalNavigationSpacerItemComponent } from '@pristine/components/navigation/horizontal/components/spacer/spacer.component';
import { PristineHorizontalNavigationComponent } from '@pristine/components/navigation/horizontal/horizontal.component';
import { PristineVerticalNavigationAsideItemComponent } from '@pristine/components/navigation/vertical/components/aside/aside.component';
import { PristineVerticalNavigationBasicItemComponent } from '@pristine/components/navigation/vertical/components/basic/basic.component';
import { PristineVerticalNavigationCollapsableItemComponent } from '@pristine/components/navigation/vertical/components/collapsable/collapsable.component';
import { PristineVerticalNavigationDividerItemComponent } from '@pristine/components/navigation/vertical/components/divider/divider.component';
import { PristineVerticalNavigationGroupItemComponent } from '@pristine/components/navigation/vertical/components/group/group.component';
import { PristineVerticalNavigationSpacerItemComponent } from '@pristine/components/navigation/vertical/components/spacer/spacer.component';
import { PristineVerticalNavigationComponent } from '@pristine/components/navigation/vertical/vertical.component';

@NgModule({
    declarations: [
        PristineHorizontalNavigationBasicItemComponent,
        PristineHorizontalNavigationBranchItemComponent,
        PristineHorizontalNavigationDividerItemComponent,
        PristineHorizontalNavigationSpacerItemComponent,
        PristineHorizontalNavigationComponent,
        PristineVerticalNavigationAsideItemComponent,
        PristineVerticalNavigationBasicItemComponent,
        PristineVerticalNavigationCollapsableItemComponent,
        PristineVerticalNavigationDividerItemComponent,
        PristineVerticalNavigationGroupItemComponent,
        PristineVerticalNavigationSpacerItemComponent,
        PristineVerticalNavigationComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        PristineScrollbarModule
    ],
    exports     : [
        PristineHorizontalNavigationComponent,
        PristineVerticalNavigationComponent
    ]
})
export class PristineNavigationModule
{
}
