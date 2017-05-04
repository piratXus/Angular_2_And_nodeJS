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
import {UserDetailsComponent } from './user/user-companents/user-details/user-details.component'
import {UserModal} from './user/user-companents/user-dialog/user-dialog'
import {BlackListComponent} from './user/user-companents/black-list/black-list.component'

const appRoutes: Routes = [
  { path: '', component: UserComponent },
  { path: 'black-list', component: BlackListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailsComponent,
    UserModal,
    BlackListComponent,
    SwitchComponent,

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

  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ UserModal ]
})
export class AppModule { }
