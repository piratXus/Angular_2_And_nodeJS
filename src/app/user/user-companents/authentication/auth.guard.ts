/**
 * Created by emergency on 5/8/2017.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from './auth.sevice'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private  auth : AuthService) { }

    canActivate() {
        console.log("canActivate");
        if (this.auth.loggedIn()) {
            console.log('localStrorage');
            // this.router.navigateByUrl('/');
            return true;
        }else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
