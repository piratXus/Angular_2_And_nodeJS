import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { SwitchComponent } from 'angular2-bootstrap-switch/components';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user-companents/user-list/user-component';
import {UserDetailsComponent } from './user/user-companents/user-details/user-details.component';
import {UserModal} from './user/user-companents/user-dialog/user-dialog';
import {BlackListComponent} from './user/user-companents/black-list/black-list.component';
import {LoginComponent} from './user/user-companents/login-user/login-user.component';
import {AuthService} from './user/user-companents/authentication/auth.sevice';
import {AuthGuard} from './user/user-companents/authentication/auth.guard';
import  {AdminService} from  './user/user-companents/authentication/admin.service';
import {UserService} from './user/user.service'

const appRoutes: Routes = [
  { path: '', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'black-list', component: BlackListComponent, canActivate: [AuthGuard]},

];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailsComponent,
    UserModal,
    BlackListComponent,
    SwitchComponent,
    LoginComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],

  providers: [AuthGuard,AuthService, AdminService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [ UserModal ]
})
export class AppModule { }
