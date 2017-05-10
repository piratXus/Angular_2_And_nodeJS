/**
 * Created by emergency on 5/10/2017.
 */
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import {UserService} from '../../user.service'
import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {

    constructor(private userService:UserService){
    }

    jwtHelper: JwtHelper = new JwtHelper();

    isAdmin(){
        let token = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
        this.userService.getRoleByUserId(token.id).then((resp)=>{
            console.dir(token);
            console.dir(resp);
        });



        /* if(role === "admin"){

        }*/
    }

}