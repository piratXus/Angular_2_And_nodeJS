/**
 * Created by piratXus on 29.04.2017.
 */
import { Component, Input } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ImportResolver} from "@angular/compiler";

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details-style.css']
})

export class UserDetailsComponent {

    @Input()
    user: User;

    @Input()
    showUserDetails: boolean;

    @Input()
    createHandler: Function;

    constructor (private userService: UserService) {

    }

    createUser() {
        console.log("user-details");
        console.dir(this.user);
        this.userService.createUser(this.user).then(() => {
            this.createHandler();
        });
        this.user = null;
        this.showUserDetails = false;
    }

}
