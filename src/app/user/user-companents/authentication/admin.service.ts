/**
 * Created by emergency on 5/10/2017.
 */
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import {UserService} from '../../user.service'
import { Injectable } from '@angular/core';
import {error} from "util";


@Injectable()
export class AdminService {

    constructor(private userService:UserService){
    this.getRole();
    }

    jwtHelper: JwtHelper = new JwtHelper();

    role: string;

    getRole(){
        if(localStorage.getItem('id_token')){
            let token = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
            return this.userService.getRoleByUserId(token.id).then((resp)=>{
                this.role = resp[0].role;
            }).catch(error);
        }else {
            this.role ="";
        }

    }

    isAdmin(){
        if(this.role === "admin"){
            return true;
        }else {
            return false;
        }
    }

}