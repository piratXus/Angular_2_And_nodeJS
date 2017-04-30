/**
 * Created by piratXus on 28.04.2017.
 */
import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';
import {BlackList} from "../../blacklist";

@Component({
    selector: 'user-components',
    templateUrl: './user-component.html',
    styleUrls: ['./user-style.css'],
    providers: [UserService]
})

export class UserComponent{

    users: User[];
    blackListUser: User[];
    selectedUser: User;


    constructor(private userService: UserService){}

    ngOnInit(){
        let bl = [];
        let us = [];
        this.userService.getAllUsers().
            then((users:User[])=>{
            users.forEach((user)=>{
                this.userService.ExistsUser(user.id)
                    .then((resp)=>{
                    console.dir();
                        if(resp[0].count>0){
                           bl.push(user);
                        }else {
                          us.push(user);
                        };
                    });
            this.blackListUser = bl;
            this.users = us;
            });
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
        console.log("create new User")
        var user: User = {
            login:'',
            name: '',
            surname:''
        };

        this.selectUser(user);
    }

    deleteUser = () => {
        this.ngOnInit();
    }

    addUser = () => {
        this.ngOnInit();
    }

    updateUser = () => {
        this.ngOnInit();
    }

    deleteUserWithBlackList(userId: number): void {
        this.userService.deleteUser(userId).then((deletedUserId: number) => {
            this.ngOnInit();
        });
    }
}