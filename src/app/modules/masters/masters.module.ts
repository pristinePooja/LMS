import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule, Routes } from '@angular/router';
import { PristineDrawerModule } from '@pristine/components/drawer';
import { HeaderModule } from '@pristine/components/header/header.module';
import { SharedModule } from 'app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MastersComponent } from './masters.component';
import { MastersService } from './masters.service';
import { MatCardModule } from '@angular/material/card';
import { MastersFilterComponent } from './masters-filter/masters-filter.component';
import { GstSetupComponenet } from './gst-setup/gst-setup.component';
import { GstHsnComponent } from './gst-hsn/gst-hsn.component';
import { GstHsnFilterComponent } from './gst-hsn/gst-hsn-filter/hsn-filter.component';
import { GstSetupFilterComponent } from './gst-setup/gst-setup-filter/gst-setup-filter.component';


const route: Routes =[
  {
    path:'contact_list',
    component: MastersComponent,
    resolve:{
      key:MastersService,
    }

  },

  {
    path: 'gst-setup', 
    component:GstSetupComponenet,
    resolve:{
      key:MastersService,
    }
  },
  {
    path: 'gst-hsn', 
    component:GstHsnComponent,
    resolve:{
      key:MastersService,
    }
  }
]

@NgModule({
    declarations:[
        MastersComponent,
        MastersFilterComponent,
        GstSetupComponenet,
        GstHsnComponent,
        GstHsnFilterComponent,
        GstSetupFilterComponent
    ],

    imports:[
      CommonModule,
      SharedModule,
      MatButtonModule,
      HeaderModule,
      MatSidenavModule,
      PristineDrawerModule,
      MatFormFieldModule,
      MatInputModule,
      MatPaginatorModule,
      MatTableModule,
      MatCardModule,
      MatCheckboxModule,
      NgxSpinnerModule,
      MatSelectModule,
      MatMenuModule,
      MatDividerModule,
      RouterModule.forChild(route)
    ],
    
    providers:[
        MastersService,
        DatePipe
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class MastersModule{}