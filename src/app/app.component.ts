import { Component } from '@angular/core';
import {AuthService} from './user/user-companents/authentication/auth.sevice'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['user/user-companents/user-list/user-style.css']
})
export class AppComponent {
  authServ:AuthService;
  constructor(private auth: AuthService){this.authServ = this.auth};
}
