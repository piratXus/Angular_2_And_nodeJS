/**
 * Created by emergency on 5/5/2017.
 */
/**
 * Created by piratXus on 29.04.2017.
 */
import { Component, Input } from '@angular/core';
import { UserService } from '../../user.service';
import { AuthService } from '../authentication/auth.sevice';
import { AuthGuard } from '../authentication/auth.guard'
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {UserLogin} from '../../userLogin';
import {User} from "../../user";
import { Router, CanActivate } from '@angular/router';


@Component({
    selector: 'user-login',
    templateUrl: './login-component.html',
    providers: [UserService,AuthService,AuthGuard]
})

export class LoginComponent {
    user: UserLogin;
    LoginForm: FormGroup;
    token = localStorage.getItem('id_token');

    fb: any;

    constructor(private auth: AuthService,fb: FormBuilder,private router: Router) {
        this.fb = fb;
        this.ngOnInit();
    }


    ngOnInit(){
        this.LoginForm = this.fb.group({
            login: [null,Validators.required],
            password:[null,Validators.required],
        });
    }

    onLogin() {
        this.user = this.LoginForm.value;
            this.auth.login(this.user).then(()=>{
            if(this.auth.loggedIn()){
                    this.router.navigateByUrl("/");
                }
            });
    }

}
