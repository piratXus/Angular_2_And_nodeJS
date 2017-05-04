import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';


import { AppComponent } from './app.component';
import { UserComponent } from './user/user-companents/user-list/user-component';
import {UserDetailsComponent } from './user/user-companents/user-details/user-details.component'
import {UserModal} from './user/user-companents/user-dialog/user-dialog'

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailsComponent,
      UserModal,
    // UserDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    BootstrapModalModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ UserModal ]
})
export class AppModule { }
