import { Component } from '@angular/core';
import {AuthService} from './user/user-companents/authentication/auth.sevice'
import {AdminService} from './user/user-companents/authentication/admin.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['user/user-companents/user-list/user-style.css'],
  providers: [AuthService,AdminService]
})

export class AppComponent {
  authServ:AuthService;
  admin:AdminService;

  constructor(private auth: AuthService, private adminService: AdminService){
    this.authServ = this.auth;
    this.admin = this.adminService;
  };

}
