/**
 * Created by emergency on 5/8/2017.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }else {
            this.router.navigateByUrl('');
            return false;
        }
    }
}
