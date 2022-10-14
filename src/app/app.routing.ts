import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import {ExampleComponent} from "./modules/admin/example/example.component";
import {LeadsComponent} from "./modules/leads/leads.component";
import {LandingHomeModule} from "./modules/landing/home/home.module"
// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},
    {path: 'sign-in',
    data:{
            layout: 'empty'
        },
        loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},

    {path:'dashboard',
        children   : [
            {path: '', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },

    {
        path:'crm',
        // canActivate: [AuthGuard],
        // component: LeadsComponent
        children: [
            {path: 'lead_list',component: LeadsComponent},
            {path: '',loadChildren :()=>import('app/modules/leads/leads.module').then(m => m.LeadsModule)},
        ]
    },

    {
        path:'users',
        // canActivate: [AuthGuard],
        // component: LeadsComponent
        children: [
            {path: '',loadChildren :()=>import('app/modules/users/users.module').then(m => m.UsersModule)},
        ]

    },
    {
        path:'crm', 
        children: [
            {path: '',loadChildren :()=>import('app/modules/masters/masters.module').then(m => m.MastersModule)},
        ]

    },
    // Auth routes for guests
    // {
    //     path: '',
    //     canActivate: [NoAuthGuard],
    //     canActivateChild: [NoAuthGuard],
    //     // component: LayoutComponent,
    //     // data: {
    //     //     layout: 'empty'
    //     // },
    //     children: [
    //         // {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
    //         // {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
    //         // {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
    //         {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
    //         // {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
    //     ]
    // },

    // Auth routes for authenticated users
    // {
    //     path: '',
    //     canActivate: [AuthGuard],
    //     canActivateChild: [AuthGuard],
    //     // component: LayoutComponent,
    //     data: {
    //         layout: 'empty'
    //     },
    //     children: [
    //         {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
    //         {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
    //     ]
    // },
    {
        path:'**',  redirectTo:'/sign-in'
    },
];
