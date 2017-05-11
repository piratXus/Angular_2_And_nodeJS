/**
 * Created by emergency on 5/8/2017.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from './auth.sevice'
import {AdminService} from './admin.service'

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private router: Router,private  auth : AuthService, private adminServise: AdminService) {
        // this.role.admin = true;
    }

    canActivate() {
        console.log("canActivate");
        if (this.auth.loggedIn()) {
            return true;
        }else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
