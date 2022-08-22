import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersProfileComponent } from './profile/users_Profile.component';
import { Routes, RouterModule} from  '@angular/router'
import { SharedModule } from 'app/shared/shared.module';
const route: Routes =[
  {
    path:'profile',
    component: UsersProfileComponent
  }
]

@NgModule({
  declarations: [
    UsersProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route)
  ]
})
export class UsersModule { }
