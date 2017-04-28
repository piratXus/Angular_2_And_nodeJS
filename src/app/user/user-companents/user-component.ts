/**
 * Created by piratXus on 28.04.2017.
 */
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
    selector: 'user-components',
    templateUrl: './user-component.html',
    providers: [UserService]
})

export class UserComponent{
    users: User[];

    constructor(private userService: UserService){}

    ngOnInit(){
        this.userService.getAllUsers().
            then((users:User[])=>{
            this.users = users;
        });
    }
}