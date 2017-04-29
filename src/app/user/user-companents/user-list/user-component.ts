/**
 * Created by piratXus on 28.04.2017.
 */
import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
    selector: 'user-components',
    templateUrl: './user-component.html',
    styleUrls: ['./user-style.css'],
    providers: [UserService]
})

export class UserComponent{

    users: User[];
    selectedUser: User;


    constructor(private userService: UserService){}

    ngOnInit(){
        this.userService.getAllUsers().
            then((users:User[])=>{
            this.users = users;
        });
    }

    private getIndexOfUser = (userId: number) => {
        return this.users.findIndex((user) => {
            return user.id === userId;
        });
    }

    selectUser(user: User) {
        this.selectedUser = user;
    }

    createNewUser() {
        var user: User = {
            login:'',
            name: '',
            surname:''
        };

        this.selectUser(user);
    }

    deleteUser = (userId: number) => {
        var idx = this.getIndexOfUser(userId);
        if (idx !== -1) {
            this.users.splice(idx, 1);
            this.selectUser(null);
        }
        return this.users;
    }

    addUser = (user: User) => {
        this.users.push(user);
        this.selectUser(user);
        return this.users;
    }

    updateUser = (user: User) => {
        var idx = this.getIndexOfUser(user.id);
        if (idx !== -1) {
            this.users[idx] = user;
            this.selectUser(user);
        }
        return this.users;
    }
}