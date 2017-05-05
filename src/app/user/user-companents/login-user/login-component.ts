/**
 * Created by emergency on 5/5/2017.
 */
/**
 * Created by piratXus on 29.04.2017.
 */
import { Component, Input } from '@angular/core';
import { UserService } from '../../user.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
    selector: 'user-login',
    templateUrl: './login.html',
})

export class LoginComponent {

    constructor (private userService: UserService) {
        console.log("login")
    }


}
