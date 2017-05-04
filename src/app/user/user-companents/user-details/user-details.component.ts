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

    @Input()
    closeHandler: Function;

    newFormUser: FormGroup;

    fb: any;
    constructor (private userService: UserService, fb: FormBuilder) {
        this.fb = fb;
        this.ngOnInit();
    }

    ngOnInit(){
        this.newFormUser = this.fb.group({
            login: [null,Validators.required],
            name:[null,Validators.required],
            surname:[null,Validators.required]
        });
    }

    cancel(){
        this.closeHandler();
        this.showUserDetails = false;
    }

    createUser() {
        console.log("user-details");
        console.dir(this.user);
        this.user.login = this.newFormUser.value.login;
        this.user.name = this.newFormUser.value.name;
        this.user.surname = this.newFormUser.value.surname;
        this.userService.createUser(this.user).then(() => {
            this.createHandler();
        });

        this.user = null;
       this.ngOnInit();
        this.showUserDetails = false;

    }
}
