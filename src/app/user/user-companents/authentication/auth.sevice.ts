/**
 * Created by emergency on 5/8/2017.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Router, CanActivate } from '@angular/router';
import {error} from "util";
import { AdminService } from './admin.service';

@Injectable()
export class AuthService {



    constructor(private http: Http, private router: Router, private adminServise:AdminService) {}

    login(user): Promise<any>{
      return this.http.post('http://localhost:3000/api/authentication', user).toPromise().
      then((res)=>{
          localStorage.setItem('id_token',res.json().id_token);
                this.adminServise.getRole();
      }).catch(error)
    };

    loggedIn() {
       if(localStorage.getItem('id_token')){
           return true;
       }else {return false};
    };

    logout() {
        localStorage.removeItem('id_token');
        this.adminServise.role="";
            this.router.navigateByUrl("/login");
    };
}